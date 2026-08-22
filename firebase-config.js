// ---------- Configuração do Firebase (projeto "Nokron") ----------
// Gerado no console do Firebase (console.firebase.google.com), em
// Configurações do projeto > Seus apps. Esses valores não são segredo — são
// feitos pra ficar expostos no código do site; quem realmente protege os
// dados são as Regras de Segurança do Firestore (arquivo firestore.rules,
// colado lá no console em Firestore Database > Regras), não esconder essa
// chave.
const firebaseConfig = {
  apiKey: "AIzaSyDip7VTXNacI68Az3PyXZMs8AaqBHknogY",
  authDomain: "nokron-dacd9.firebaseapp.com",
  projectId: "nokron-dacd9",
  storageBucket: "nokron-dacd9.firebasestorage.app",
  messagingSenderId: "199865719008",
  appId: "1:199865719008:web:091b48507382cec8185885",
  measurementId: "G-RCWV2Y2CVX"
};

firebase.initializeApp(firebaseConfig);

// Instâncias usadas em todo o site (script.js, encomenda.js, etc.)
const auth = firebase.auth();
const db = firebase.firestore();