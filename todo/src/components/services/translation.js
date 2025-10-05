const MYMEMORY_API = 'https://api.mymemory.translated.net/get';


const fallbackTranslations = {
  hi: {
    auth: {
      signIn: "साइन इन करें",
      signUp: "साइन अप करें",
      email: "ईमेल पता",
      password: "पासवर्ड",
      logout: "लॉगआउट",
      welcomeBack: "वापसी पर स्वागत है",
      createAccount: "खाता बनाएं",
      forgotPassword: "पासवर्ड भूल गए?"
    },
    tasks: {
      title: "कार्य",
      addTask: "कार्य जोड़ें",
      titlePlaceholder: "क्या करना है?",
      notesPlaceholder: "नोट्स जोड़ें...",
      edit: "संपादित करें",
      delete: "हटाएं",
      save: "सहेजें",
      cancel: "रद्द करें",
      markComplete: "पूर्ण चिह्नित करें",
      markIncomplete: "अपूर्ण चिह्नित करें",
      confirmDelete: "क्या आप वाकई इस कार्य को हटाना चाहते हैं?",
      addNote: "नोट जोड़ें",
      notes: "नोट्स",
      titleRequired: "कृपया कार्य शीर्षक दर्ज करें"
    },
    status: {
      all: "सभी",
      pending: "लंबित",
      completed: "पूर्ण"
    },
    ui: {
      loading: "लोड हो रहा है...",
      noTasks: "अभी तक कोई कार्य नहीं",
      addFirstTask: "शुरू करने के लिए अपना पहला कार्य जोड़ें!",
      searchPlaceholder: "कार्य खोजें...",
      noResults: "कोई कार्य नहीं मिला",
      tryDifferent: "अलग खोज शब्द आज़माएं",
      dashboard: "डैशबोर्ड",
      overview: "आपकी उत्पादकता का अवलोकन",
      showing: "दिखा रहा है",
      of: "का",
      for: "के लिए"
    }
  }
};

export const translateText = async (text, targetLanguage = 'hi') => {
  
  if (!text || targetLanguage === 'en') return text;
  
  try {
    const sourceLang = 'en'; 
    const targetLang = targetLanguage;
    
    const response = await fetch(
      `${MYMEMORY_API}?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`
    );

    if (!response.ok) {
      throw new Error('Translation API failed');
    }

    const data = await response.json();
    return data.responseData.translatedText;
  } catch (error) {
    console.warn('Translation failed, using fallback:', error);
    

    const keys = text.toLowerCase().split(' ');
    let fallbackText = text; 
    
   
    Object.values(fallbackTranslations.hi).forEach(category => {
      if (typeof category === 'object') {
        Object.entries(category).forEach(([key, value]) => {
          if (text.toLowerCase().includes(key) || keys.some(k => value.toLowerCase().includes(k))) {
            fallbackText = value;
          }
        });
      }
    });
    
    return fallbackText;
  }
};

export const getTranslation = (key, language) => {
  if (language === 'en') return null; 
  
  const keys = key.split('.');
  let value = fallbackTranslations[language];
  
  for (const k of keys) {
    value = value?.[k];
    if (!value) break;
  }
  
  return value || null;
};