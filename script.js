// ---------- Estado de sessão (Firebase Auth + Firestore) ----------
    // currentUser: { uid, email, nick, discord, username } | null
    // A sessão fica salva pelo próprio Firebase (não em memória), então a
    // pessoa continua logada mesmo depois de fechar o navegador — só sai de
    // verdade clicando em "Sair".
    let currentUser = null;

    const overlay = document.getElementById('modal-overlay');
    const profileBtn = document.getElementById('profile-btn');
    const modalClose = document.getElementById('modal-close');
    const authView = document.getElementById('auth-view');
    const profileView = document.getElementById('profile-view');
    const avatarDot = document.getElementById('avatar-dot');
    const profileBtnLabel = document.getElementById('profile-btn-label');
    const authError = document.getElementById('auth-error');
    const authSuccess = document.getElementById('auth-success');
    const verifyEmailNotice = document.getElementById('verify-email-notice');

    function openModal(){
      overlay.classList.add('open');
      renderModalState();
      // Se a pessoa continua logada mas ainda não confirmou o e-mail, atualiza
      // o status de verificação (o Firebase não avisa sozinho quando ela clica
      // no link do e-mail em outra aba, então a gente confere de novo aqui).
      if(currentUser && auth.currentUser && !currentUser.emailVerified){
        auth.currentUser.reload().then(() => {
          if(currentUser) currentUser.emailVerified = auth.currentUser.emailVerified;
          renderModalState();
          notifyProfileUpdate();
        }).catch(() => {});
      }
    }
    function closeModal(){ overlay.classList.remove('open'); }

    profileBtn.addEventListener('click', openModal);
    modalClose.addEventListener('click', closeModal);
    overlay.addEventListener('click', (e) => { if(e.target === overlay) closeModal(); });

    function showAuthFormPane(name){
      document.querySelectorAll('.form-pane').forEach(p => p.classList.remove('active'));
      document.getElementById('pane-' + name).classList.add('active');
      hideAuthError();
      hideAuthSuccess();
    }

    // Tabs login / cadastro
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        document.querySelector('.tabs').style.display = '';
        document.getElementById('modal-title').textContent = 'Entrar / Cadastrar';
        showAuthFormPane(btn.dataset.tab);
      });
    });

    function showAuthError(msg){
      authSuccess.hidden = true;
      authError.textContent = msg;
      authError.hidden = false;
    }
    function hideAuthError(){
      authError.hidden = true;
      authError.textContent = '';
    }
    function showAuthSuccess(msg){
      authError.hidden = true;
      authSuccess.textContent = msg;
      authSuccess.hidden = false;
    }
    function hideAuthSuccess(){
      authSuccess.hidden = true;
      authSuccess.textContent = '';
    }

    function renderModalState(){
      if(currentUser){
        authView.style.display = 'none';
        profileView.style.display = 'block';
        document.getElementById('modal-title').textContent = 'Meu Perfil';
        document.getElementById('profile-name').textContent = currentUser.nick;
        document.getElementById('profile-sub').textContent =
          '@' + currentUser.username + (currentUser.discord ? ' · Discord: ' + currentUser.discord : '');
        document.getElementById('profile-avatar-big').textContent = currentUser.nick.charAt(0).toUpperCase();
        verifyEmailNotice.hidden = !!currentUser.emailVerified;
      } else {
        authView.style.display = 'block';
        profileView.style.display = 'none';
        document.getElementById('modal-title').textContent = 'Entrar / Cadastrar';
      }
    }

    // Outras páginas (como a de encomenda) podem definir window.onProfileUpdate
    // para reagir a login/logout (ex: pré-preencher campos do formulário).
    function notifyProfileUpdate(){
      if(typeof window.onProfileUpdate === 'function') window.onProfileUpdate();
    }

    function applyUser(profile){
      currentUser = profile;
      avatarDot.textContent = profile.nick.charAt(0).toUpperCase();
      profileBtnLabel.textContent = profile.nick;
      renderModalState();
      notifyProfileUpdate();
    }

    function clearUser(){
      currentUser = null;
      avatarDot.textContent = '?';
      profileBtnLabel.textContent = 'Perfil';
      renderModalState();
      notifyProfileUpdate();
    }

    // Busca o perfil (nick, discord, username) salvo no Firestore pro uid logado.
    function loadUserProfile(user){
      return db.collection('users').doc(user.uid).get().then(doc => {
        if(!doc.exists) return null;
        const data = doc.data();
        return {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          nick: data.nick,
          discord: data.discord || '',
          username: data.username
        };
      });
    }

    // Mantém a sessão entre visitas: assim que a página carrega, o Firebase já
    // avisa (de forma assíncrona) se a pessoa continua logada de uma visita
    // anterior — sem precisar entrar de novo.
    auth.onAuthStateChanged(user => {
      if(user){
        loadUserProfile(user)
          .then(profile => { if(profile) applyUser(profile); })
          .catch(err => console.error('Erro ao carregar perfil:', err));
      } else {
        clearUser();
      }
    });

    function setBusy(btn, busy, busyLabel, normalLabel){
      btn.disabled = busy;
      btn.textContent = busy ? busyLabel : normalLabel;
    }

    function friendlyAuthError(err){
      const code = err && err.code;
      const map = {
        'auth/invalid-email': 'E-mail inválido.',
        'auth/user-not-found': 'Não encontramos essa conta. Confira o usuário/e-mail ou cadastre-se.',
        'auth/wrong-password': 'Senha incorreta.',
        'auth/invalid-credential': 'Usuário/e-mail ou senha incorretos.',
        'auth/too-many-requests': 'Muitas tentativas. Espere um pouco e tente de novo.',
        'auth/email-already-in-use': 'Já existe uma conta cadastrada com esse e-mail.',
        'auth/weak-password': 'A senha precisa ter pelo menos 6 caracteres.',
        'auth/network-request-failed': 'Falha de conexão. Confira sua internet e tente de novo.'
      };
      return (code && map[code]) || 'Não foi possível concluir. Tente novamente em instantes.';
    }

    // ---------- Login ----------
    const loginForm = document.getElementById('pane-login');
    const loginSubmitBtn = document.getElementById('login-submit-btn');

    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAuthError();
      hideAuthSuccess();

      const identifier = document.getElementById('login-identifier').value.trim();
      const senha = document.getElementById('login-senha').value;
      if(!identifier || !senha) return;

      setBusy(loginSubmitBtn, true, 'Entrando...', 'Entrar');

      resolveEmailFromIdentifier(identifier)
        .then(email => auth.signInWithEmailAndPassword(email, senha))
        .then(() => {
          closeModal();
          loginForm.reset();
        })
        .catch(err => showAuthError(friendlyAuthError(err)))
        .finally(() => setBusy(loginSubmitBtn, false, 'Entrando...', 'Entrar'));
    });

    // Usado tanto no login quanto na redefinição de senha: aceita e-mail
    // direto, ou resolve o "nome de usuário no site" pro e-mail cadastrado.
    function resolveEmailFromIdentifier(identifier){
      if(identifier.includes('@')) return Promise.resolve(identifier);
      return db.collection('usernames').doc(identifier.toLowerCase()).get().then(doc => {
        if(!doc.exists){ const e = new Error('username not found'); e.code = 'auth/user-not-found'; throw e; }
        return doc.data().email;
      });
    }

    // ---------- Esqueci minha senha ----------
    const forgotPasswordLink = document.getElementById('forgot-password-link');
    const resetForm = document.getElementById('pane-reset');
    const resetSubmitBtn = document.getElementById('reset-submit-btn');
    const resetBackBtn = document.getElementById('reset-back-btn');
    const tabsWrap = document.querySelector('.tabs');

    forgotPasswordLink.addEventListener('click', () => {
      showAuthFormPane('reset');
      tabsWrap.style.display = 'none';
      document.getElementById('modal-title').textContent = 'Redefinir senha';
    });

    resetBackBtn.addEventListener('click', () => {
      tabsWrap.style.display = '';
      document.getElementById('modal-title').textContent = 'Entrar / Cadastrar';
      document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelector('.tab-btn[data-tab="login"]').classList.add('active');
      showAuthFormPane('login');
    });

    resetForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAuthError();
      hideAuthSuccess();

      const identifier = document.getElementById('reset-identifier').value.trim();
      if(!identifier) return;

      setBusy(resetSubmitBtn, true, 'Enviando...', 'Enviar link de redefinição');

      resolveEmailFromIdentifier(identifier)
        .then(email => auth.sendPasswordResetEmail(email))
        .then(() => {
          showAuthSuccess('Link de redefinição enviado! Confira sua caixa de entrada (e o spam).');
          resetForm.reset();
        })
        .catch(err => showAuthError(friendlyAuthError(err)))
        .finally(() => setBusy(resetSubmitBtn, false, 'Enviando...', 'Enviar link de redefinição'));
    });

    // ---------- Cadastro ----------
    const cadastroForm = document.getElementById('pane-cadastro');
    const cadastroSubmitBtn = document.getElementById('cadastro-submit-btn');
    const USERNAME_RE = /^[a-zA-Z0-9_]{3,20}$/;

    cadastroForm.addEventListener('submit', (e) => {
      e.preventDefault();
      hideAuthError();
      hideAuthSuccess();

      const email = document.getElementById('cad-email').value.trim();
      const nick = document.getElementById('cad-nick').value.trim();
      const discord = document.getElementById('cad-discord').value.trim();
      const username = document.getElementById('cad-username').value.trim();
      const senha = document.getElementById('cad-senha').value;
      const senhaConfirm = document.getElementById('cad-senha-confirm').value;

      if(!email || !nick || !discord || !username || !senha || !senhaConfirm) return;

      if(!USERNAME_RE.test(username)){
        showAuthError('O nome de usuário deve ter de 3 a 20 letras, números ou "_", sem espaços.');
        return;
      }
      if(senha.length < 6){
        showAuthError('A senha precisa ter pelo menos 6 caracteres.');
        return;
      }
      if(senha !== senhaConfirm){
        showAuthError('As senhas não são iguais.');
        return;
      }

      const usernameKey = username.toLowerCase();
      let uid = null;
      setBusy(cadastroSubmitBtn, true, 'Criando perfil...', 'Criar perfil');

      db.collection('usernames').doc(usernameKey).get()
        .then(doc => {
          if(doc.exists){ const e = new Error('username taken'); e.code = 'nokron/username-taken'; throw e; }
          return auth.createUserWithEmailAndPassword(email, senha);
        })
        .then(cred => {
          uid = cred.user.uid;
          const batch = db.batch();
          batch.set(db.collection('users').doc(uid), {
            nick: nick,
            discord: discord,
            username: username,
            email: email,
            createdAt: firebase.firestore.FieldValue.serverTimestamp()
          });
          batch.set(db.collection('usernames').doc(usernameKey), {
            uid: uid,
            email: email
          });
          // Se não conseguir reservar o perfil/usuário (ex: alguém pegou o
          // mesmo nome de usuário nesse meio tempo), desfaz a conta criada
          // pra pessoa poder tentar de novo do zero.
          return batch.commit()
            .catch(batchErr => cred.user.delete().finally(() => { throw batchErr; }))
            .then(() => cred.user.sendEmailVerification().catch(err => {
              // Não deixamos uma falha só no envio do e-mail de verificação
              // derrubar o cadastro inteiro — a pessoa pode reenviar depois
              // pelo próprio perfil.
              console.error('Falha ao enviar e-mail de verificação:', err);
            }));
        })
        .then(() => {
          applyUser({ uid: uid, email: email, nick: nick, discord: discord, username: username, emailVerified: false });
          closeModal();
          cadastroForm.reset();
        })
        .catch(err => {
          if(err && err.code === 'nokron/username-taken'){
            showAuthError('Esse nome de usuário já está em uso. Escolha outro.');
          } else {
            showAuthError(friendlyAuthError(err));
          }
        })
        .finally(() => setBusy(cadastroSubmitBtn, false, 'Criando perfil...', 'Criar perfil'));
    });

    document.getElementById('logout-btn').addEventListener('click', () => {
      auth.signOut();
      closeModal();
    });

    // ---------- Reenviar e-mail de verificação ----------
    const resendVerificationBtn = document.getElementById('resend-verification-btn');
    resendVerificationBtn.addEventListener('click', () => {
      if(!auth.currentUser) return;
      const original = resendVerificationBtn.textContent;
      resendVerificationBtn.disabled = true;
      auth.currentUser.sendEmailVerification()
        .then(() => { resendVerificationBtn.textContent = 'E-mail enviado! Confira sua caixa de entrada.'; })
        .catch(() => { resendVerificationBtn.textContent = 'Não deu certo, tente de novo.'; })
        .finally(() => {
          setTimeout(() => {
            resendVerificationBtn.textContent = original;
            resendVerificationBtn.disabled = false;
          }, 4000);
        });
    });

    // Menu mobile
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');
    menuToggle.addEventListener('click', () => mainNav.classList.toggle('open'));
    mainNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mainNav.classList.remove('open')));

    // ---------- Anel de energia dos botões (.btn-primary e #profile-btn) ----------
    // A rotação do anel roda via CSS (@keyframes) enquanto a classe .spin-active
    // está presente. Em vez de deixar o :hover puro cortar a animação de repente
    // ao tirar o mouse, aqui a gente: 1) lê o ângulo exato em que a animação
    // estava no instante do mouseleave, 2) "congela" o anel ali com transição
    // desligada (pra não pular), 3) liga uma transição suave até o próximo
    // múltiplo de 90°, dando aquele efeito de desacelerar e voltar ao início
    // gradualmente em vez de simplesmente resetar.
    const SPIN_SETTLE_TRANSITION =
      '--btn-angle .6s cubic-bezier(.22,.68,0,1), ' +
      'transform .28s cubic-bezier(.34,1.56,.64,1), ' +
      'box-shadow .5s ease, border-color .2s ease, color .2s ease';

    document.querySelectorAll('.btn-primary, #profile-btn').forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if(btn._spinSettleTimeout){
          clearTimeout(btn._spinSettleTimeout);
          btn._spinSettleTimeout = null;
        }
        // Congela o ângulo atual (pode estar no meio de uma desaceleração)
        // antes de religar a animação, pra ela retomar dali sem pular.
        const current = getComputedStyle(btn).getPropertyValue('--btn-angle').trim();
        btn.style.transition = 'none';
        if(current) btn.style.setProperty('--btn-angle', current);
        void btn.offsetWidth; // força reflow
        btn.style.transition = '';
        btn.classList.add('spin-active');
      });

      btn.addEventListener('mouseleave', () => {
        const current = getComputedStyle(btn).getPropertyValue('--btn-angle').trim() || '0deg';
        const deg = parseFloat(current) || 0;
        const remainder = deg % 90;
        const target = deg + (remainder === 0 ? 90 : 90 - remainder);

        btn.classList.remove('spin-active');
        btn.style.transition = 'none';
        btn.style.setProperty('--btn-angle', deg + 'deg');
        void btn.offsetWidth; // força reflow antes de ligar a transição
        btn.style.transition = SPIN_SETTLE_TRANSITION;
        btn.style.setProperty('--btn-angle', target + 'deg');

        btn._spinSettleTimeout = setTimeout(() => {
          // Reduz o ângulo pro equivalente entre 0-360° (visualmente idêntico,
          // já que o anel é um gradiente cônico periódico) só pra ele não
          // crescer sem limite a cada hover — nunca pra um valor fixo, senão
          // isso causaria o mesmo salto brusco que a gente tá tentando evitar.
          const resting = ((target % 360) + 360) % 360;
          btn.style.transition = 'none';
          btn.style.setProperty('--btn-angle', resting + 'deg');
          void btn.offsetWidth;
          btn.style.transition = '';
          btn._spinSettleTimeout = null;
        }, 650);
      });
    });