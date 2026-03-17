import { useState, useRef, useEffect } from "react";
import "./App.css";
import Button from "/src/components/Button";
import logo from "/src/assets/logo.svg";
import fundo from "/src/assets/hero_img.jpg";
import copy from "/src/assets/Copy.svg";
import sound from "/src/assets/sound_max_fill.svg";
import butttonChange from "/src/assets/Horizontal_top_left_main.svg";
import { detect } from "tinyld";

import sortAlfa from "/src/assets/Sort_alfa.svg";

function App() {
  const [translatingText, setTranslatingText] = useState("Hello, how are you?");
  const [translatedText, setTranslatedText] = useState(
    "Bonjour, comment allez-vous ?",
  );
  const [copied, setCopying] = useState(false);
  const inputRef = useRef(null);
  const outputRef = useRef(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("French");

  //Mapeando idiomas para os códigos ISO para utilizar na api
  const LanguageMap = {
    English: "en-US",
    French: "fr-FR",
    Spanish: "es-ES",
  };

  // Função par idiomar a detecta do texto de entrada usando tinyld
  const detectLanguage = (text) => {
    if (!text || text.trim().length === 0) return "en-US";

    // tinyld.detect retorna código ISO de duas letras
    const detectedCode = detect(text) || "en";

    const languageMapping = {
      en: "en-US",
      fr: "fr-FR",
      es: "es-ES",
    };

    return languageMapping[detectedCode] || "en-US";
  };

  // Lógica da fala
  const speak = (text, languageCode) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = languageCode;

    window.speechSynthesis.cancel(utterance); // cancelando caso seja clicado mais de uma vez
    window.speechSynthesis.speak(utterance);
  };

  // Toggle para entrada - escolhe um idioma ou 'auto'
  function toggleInputLanguage(nome) {
    if (nome === inputLanguage) return; // nada muda quando clica novamente
    // se houver um idioma definido anteriormente, movemos ele para o output
    if (inputLanguage && inputLanguage !== "auto") {
      setOutputLanguage(inputLanguage);
    }
    setInputLanguage(nome);
  }
  // Toggle para saída
  function toggleOutputLanguage(nome) {
    if (nome === outputLanguage) return;
    // se usuário escolher mesmo idioma da entrada, invertemos
    if (nome === inputLanguage) {
      setInputLanguage(outputLanguage);
      setOutputLanguage(inputLanguage);
    } else {
      setOutputLanguage(nome);
    }
  }
  // função que inverte os idiomas quando clicada
  function changeLanguage() {
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }
  // Manipular a quantidade de caracteres
  const handleInput = (e) => {
    if (e.target.value.length <= 500) {
      setTranslatingText(e.target.value);
      setTranslatedText;
    }
  };

  //Lógica da tradução
  async function handleTranslate(text, languageIn, languageOut) {
    // se entrada for "auto", determina pelo texto
    const langInCode =
      languageIn === "auto"
        ? detectLanguage(text)
        : LanguageMap[languageIn] || "en-US";

    const langOutCode = LanguageMap[languageOut] || "en-US";

    const url = `https://api.mymemory.translated.net/get?
    q=${encodeURIComponent(text)}
    &langpair=${langInCode}|${langOutCode}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      setTranslatedText(data.responseData.translatedText);
    } catch (error) {
      console.error("Translation error:", error);
      alert("Couldn't translate");
    }
  }

  //Lógica da copia de texto
  async function copying(text) {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopying(true);
      // reseta o botão a cada 2 segundos
      setTimeout(() => setCopying(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  }

  // manipula ajustando a altura do textarea
  useEffect(() => {
    const adjustHeight = (el) => {
      if (el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }
    };

    adjustHeight(inputRef.current);

    // sincroniza altura do output com o input sempre que este muda
    if (outputRef.current && inputRef.current) {
      outputRef.current.style.height = inputRef.current.style.height;
    }
  }, [translatingText]); // dispara ao mudar o texto de entrada

  // mantém a lógica original caso o texto traduzido seja maior que o input
  useEffect(() => {
    const adjustHeight = (el) => {
      if (el) {
        el.style.height = "auto";
        el.style.height = el.scrollHeight + "px";
      }
    };

    adjustHeight(outputRef.current);

    // sincroniza altura do input com o output sempre que este muda
    if (outputRef.current && inputRef.current) {
      inputRef.current.style.height = outputRef.current.style.height;
    }
  }, [translatedText]); // dispara quando a tradução chega

  return (
    <>
      <main className="bg-[#040711]  min-w-dvw min-h-dvh ">
        <div className="w-screen flex flex-row justify-center">
          <img className="w-full h-80 object-cover " src={fundo} alt="fundo" />
          <img className="w-50 absolute top-15 " src={logo} alt="logo" />
        </div>
        <section className="flex flex-col  gap-y-4 lg:flex-row justify-center lg:gap-x-4">
          <nav
            className="bg-[rgba(18,24,38,0.8)] w-full relative bottom-38 min-[600px]:left-10 min-[600px]:w-130 
            border-2 border-[#4D5562]  rounded-3xl "
            aria-label="Seleção de idiomas"
          >
            <div
              className=" w-[90%] h-[25dvw]  mt-2 ml-2  overflow-x-scroll min-[500px]:h-22 text-[16px] min-[500px]:overflow-hidden text-[#F9FAFB]font-black 
              resize-none outline-0  lg:mb-5  
              border-b-2 pb-2 min-[500px]:ml-4 border-[#394150] flex flex-row items-center"
            >
              <button
                onClick={() => toggleInputLanguage("auto")}
                className={`w-40 relative cursor-pointer p-2 font-semibold focus:bg-[#394150] focus:rounded-2xl  hover:rounded-2xl 
               hover:bg-[#394150] text-[#D2D5DA]  ${
                 inputLanguage === "auto"
                   ? "bg-[#394150] text-[#D2D5DA] rounded-2xl "
                   : "text-[#D2D5DA] hover:bg-[#394150]"
               }`}
              >
                Detect Language
              </button>
              <Button
                nome="English"
                value="en"
                active={inputLanguage === "English"}
                toggle={toggleInputLanguage}
              >
                English
              </Button>
              <Button
                nome="French"
                value="fr"
                active={inputLanguage === "French"}
                toggle={toggleInputLanguage}
              >
                French
              </Button>
              <Button
                nome="Spanish"
                value="es"
                active={inputLanguage === "Spanish"}
                toggle={toggleInputLanguage}
                className="block"
              >
                Spanish{" "}
              </Button>
              <button className="relative  ml-2">
                <svg
                  className="flex"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="26"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#e5e7eb"
                  stroke-width="2.8"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col  min-[500px]:gap-4 mt-4">
              <textarea
                ref={inputRef}
                value={translatingText}
                onChange={handleInput}
                rows={1}
                className="lg:w-120 w-[90%] overflow-hidden min-h-10 text-[18px] text-[#F9FAFB] 
                font-black mx-auto mb-10 border-0 resize-none outline-none"
                aria-label="Texto de entrada"
              />
              <footer>
                <button
                  onClick={() =>
                    speak(
                      translatingText,
                      inputLanguage === "auto"
                        ? detectLanguage(translatingText)
                        : LanguageMap[inputLanguage],
                    )
                  }
                  className="p-1 border-2 z-10 border-[#4D5562] 
                  rounded-xl relative ml-5 top-14"
                >
                  <img className="w-6 cursor-pointer" src={sound} alt="som" />
                </button>
                <button
                  onClick={() => copying(translatingText)}
                  className="p-1 border-2 z-10 border-[#4D5562] 
                  rounded-xl relative ml-2 top-14"
                >
                  <img
                    className="w-6 cursor-pointer"
                    src={copy}
                    alt="icone de cópia"
                  />
                </button>
                <div
                  className=" w-[90%] flex   justify-end 
                 relative top-2 mt-1 "
                >
                  <button
                    onClick={() =>
                      handleTranslate(
                        translatingText,
                        inputLanguage,
                        outputLanguage,
                      )
                    }
                    className=" w-40 h-12 justify-center cursr-pointer items-center flex text-[#F9FAFB] text-[16px]
                   border-[#F9FAFB] rounded-lg bg-[#263FA9]"
                  >
                    <img className="w-7 h-8 mr-2" src={sortAlfa} alt="sort" />
                    <h1>Translate</h1>
                  </button>
                </div>
              </footer>
              <p
                className="w-[90%] text-[#D2D5DA] relative 
              bottom-20 text-end text-[14px] font-semibold"
              >
                {translatingText.length}/500
              </p>
            </div>
          </nav>
          <nav
            className="bg-[rgba(18,24,38,0.8)] w-dvw pb-4 lg:pb-0 relative  min-h-76  min-[500px]:min-h-85 bottom-38 min-[600px]:left-10  min-[600px]:w-130 
            border-2 border-[#4D5562]  rounded-3xl"
            aria-label="Seleção de idiomas"
          >
            <div
              className=" w-[90%] h-[25dvw]  mt-2 ml-2  overflow-x-scroll min-[500px]:h-22 text-[16px] min-[500px]:overflow-hidden text-[#F9FAFB]font-black 
              resize-none outline-0  lg:mb-5  
              border-b-2 pb-2 min-[500px]:ml-4 border-[#394150] flex flex-row items-center"
            >
              <Button
                nome="English"
                active={outputLanguage.includes("English")}
                toggle={toggleOutputLanguage}
              >
                English
              </Button>
              <Button
                nome="French"
                active={outputLanguage.includes("French")}
                toggle={toggleOutputLanguage}
                className=" block"
              >
                French
              </Button>
              <Button
                nome="Spanish"
                active={outputLanguage.includes("Spanish")}
                toggle={toggleOutputLanguage}
                className=" block"
              >
                Spanish{" "}
              </Button>
              <button
                onClick={() => changeLanguage("auto")}
                className="p-1 hover:bg-[#394150] left-1/5 min-[500px]:left-2/5 cursor-pointer border-2 border-[#4D5562] rounded-lg relative "
              >
                <img src={butttonChange} alt="botão de trocar" />
              </button>
            </div>
            <div className="flex flex-col min-[500px]:gap-4 mt-2">
              <textarea
                ref={outputRef}
                value={translatedText}
                onChange={handleInput}
                rows={1}
                className="lg:w-120 w-[90%] min-h-15 overflow-hidden text-[18px] text-[#F9FAFB] 
                font-black mx-auto mb-10 border-0 resize-none outline-none"
                aria-label="Texto de saída"
                readOnly
              />
              <footer className="flex min-h-18 min-[500px]:min-h-0 items-end flex-row justify-start gap-2 ">
                <button
                  onClick={() =>
                    speak(
                      translatedText,
                      inputLanguage === "auto"
                        ? detectLanguage(translatedText)
                        : LanguageMap[outputLanguage],
                    )
                  }
                  className="p-1 border-2 z-10 border-[#4D5562] 
                  rounded-xl relative ml-3 min-[500px]:top-14 "
                >
                  <img className="w-6 cursor-pointer" src={sound} alt="som" />
                </button>
                <button
                  onClick={() => copying(translatedText)}
                  className="p-1 border-2 z-10 border-[#4D5562] 
                  rounded-xl relative min-[500px]:top-14"
                >
                  <img
                    className="w-6 cursor-pointer"
                    src={copy}
                    alt="icone de cópia"
                  />
                </button>
              </footer>
            </div>
          </nav>
        </section>
      </main>
    </>
  );
}

export default App;
