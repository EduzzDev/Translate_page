import { useState, useRef, useEffect } from "react";
import "./App.css";
import Button from "/src/components/Button";
import logo from "/src/assets/logo.svg";
import fundo from "/src/assets/hero_img.jpg";
import copy from "/src/assets/Copy.svg";
import sound from "/src/assets/sound_max_fill.svg";
import butttonChange from "/src/assets/Horizontal_top_left_main.svg";
import sortAlfa from "/src/assets/Sort_alfa.svg";

function App() {
  const [translatingText, setTranslatingText] = useState("Hello, how are you?");
  const [translatedText, setTranslatedText] = useState("");
  const [copied, setCopying] = useState(false);
  const textareaRef = useRef(null);
  const outputRef = useRef(null);
  const [inputLanguage, setInputLanguage] = useState("English");
  const [outputLanguage, setOutputLanguage] = useState("French");

  //Mapeando idiomas para os códigos ISO para utilizar na api
  const LanguageMap = {
    English: "en-US",
    French: "fr-FR",
    Spanish: "es-ES",
  };
  // Lógica da fala
  const speak = (text, languageCode) => {
    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = languageCode;

    window.speechSynthesis.cancel(utterance); // cancelando caso seja clicado mais de uma vez
    window.speechSynthesis.speak(utterance);
  };

  // Toggle para entrada (lado esquerdo)
  function toggleInputLanguage(nome) {
    setInputLanguage((prev) =>
      prev.includes(nome)
        ? prev.filter((lang) => lang !== nome)
        : [...prev, nome],
    );
    setInputLanguage(inputLanguage === nome ? null : nome);
    if (nome !== inputLanguage) {
      // Se nome for diferente do input trocarmos para o input
      setOutputLanguage(inputLanguage);
    }
  }

  function toggleOutputLanguage(nome) {
    // pega o estado anterior e faz uma verificação
    setOutputLanguage(
      (prev) =>
        prev.includes(nome)
          ? prev.filter((lang) => lang !== nome) //remove
          : [...prev, nome], //ativa
    );

    if (nome === inputLanguage) {
      // Se escolher o mesmo idioma da entrada, troca os dois
      setInputLanguage(outputLanguage);
      setOutputLanguage(inputLanguage);
    } else {
      setOutputLanguage(outputLanguage === nome ? null : nome);
    }
  }
  // função que invete os idiomas quando clicada
  function changeLanguage(nome) {
    setInputLanguage(
      inputLanguage === nome ? toggleInputLanguage("auto") : nome,
    );
    setInputLanguage(outputLanguage);
    setOutputLanguage(inputLanguage);
  }
  // Manipular a quantidade de caracteres
  const handleInput = (e) => {
    if (e.target.value.length <= 500) {
      setTranslatingText(e.target.value);
    }
  };

  //copia o texto
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
        el.style.height = "auto"; // Reseta a altura para o mínimo
        // Se tiver texto, ele assume o scrollHeight
        el.style.height = el.scrollHeight + "px";
      }
    };
    adjustHeight(textareaRef.current);
    adjustHeight(outputRef.current);
  }, [translatingText]);

  return (
    <>
      <main className="bg-[#040711]   w-dvw min-h-dvh ">
        <div className="w-screen flex flex-row justify-center">
          <img className="w-full h-80 object-cover " src={fundo} alt="fundo" />
          <img className="w-50 absolute top-15 " src={logo} alt="logo" />
        </div>
        <section className="flex flex-col  gap-y-4 lg:flex-row justify-center lg:gap-x-4">
          <nav
            className="bg-[rgba(18,24,38,0.8)] w-dvw relative  lg:bottom-38 min-[600px]:left-10 min-[600px]:w-130 
            border-2 border-[#4D5562]  rounded-3xl"
            aria-label="Seleção de idiomas"
          >
            <div className="  min-[600px]:w-120  lg:mb-5 w-140  border-b-2 pb-5 ml-4 lg:ml-4 border-[#394150]">
              <button
                onClick={() => toggleInputLanguage("auto")}
                className={`w-40 relative mt-8 cursor-pointer p-2 font-semibold focus:bg-[#394150] focus:rounded-2xl  hover:rounded-2xl 
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
              >
                Spanish{" "}
              </Button>

              <button className="relative top-2 ml-2">
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
            <div className="flex flex-col gap-4 mt-4">
              <textarea
                ref={textareaRef}
                value={translatingText}
                onChange={handleInput}
                rows={1}
                className="lg:w-120  w-[90%] pointer text-[18px] overflow-hidden text-[#F9FAFB] font-black ml-8 mb-10 border-0 resize-none outline-0"
                aria-label="Texto de entrada"
              />
              <footer>
                <button
                  onClick={() =>
                    speak(translatingText, LanguageMap[inputLanguage])
                  }
                  className="p-1 border-2 z-10 border-[#4D5562] rounded-xl relative ml-5 top-14"
                >
                  <img className="w-6 cursor-pointer" src={sound} alt="som" />
                </button>
                <button
                  onClick={() => copying(translatingText)}
                  className="p-1 border-2 z-10 border-[#4D5562] rounded-xl relative ml-2 top-14"
                >
                  <img
                    className="w-6 cursor-pointer"
                    src={copy}
                    alt="icone de cópia"
                  />
                </button>
                <div className="w-120 flex  min-[600px]:justify-end justify-evenly relative top-2 mt-1 ">
                  <button
                    className=" w-40 h-12 justify-center cursor-pointer items-center flex text-[#F9FAFB] text-[16px]
                   border-[#F9FAFB] rounded-lg bg-[#263FA9]"
                  >
                    <img className="w-7 h-8 mr-2" src={sortAlfa} alt="sort" />
                    <h1>Translate</h1>
                  </button>
                </div>
              </footer>
              <p
                className="w-120 text-[#D2D5DA] relative 
              bottom-20 text-end text-[14px] font-semibold"
              >
                {translatingText.length}/500
              </p>
            </div>
          </nav>
          <nav
            className="bg-[rgba(18,24,38,0.8)] w-dvw pb-4 lg:pb-0 relative min-h-85 lg:bottom-38 min-[600px]:left-10  min-[600px]:w-130 
            border-2 border-[#4D5562]  rounded-3xl"
            aria-label="Seleção de idiomas"
          >
            <div className="  min-[600px]:w-110  lg:mb-5  border-b-2 pb-5 ml-4 lg:ml-2 border-[#394150]">
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
              >
                French
              </Button>
              <Button
                nome="Spanish"
                active={outputLanguage.includes("Spanish")}
                toggle={toggleOutputLanguage}
              >
                Spanish{" "}
              </Button>
              <button className="relative top-2 ml-2">
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
              <button
                onClick={() => changeLanguage("auto")}
                className="p-1 hover:bg-[#394150] cursor-pointer border-2 border-[#4D5562] rounded-lg relative ml-5 left-1/4"
              >
                <img src={butttonChange} alt="botão de trocar" />
              </button>
            </div>
            <div className="flex flex-col">
              <textarea
                ref={outputRef}
                value={translatedText}
                readOnly
                rows={1}
                className="lg:w-120  w-[90%]  pt-4 lg:pt-0  text-[18px]
                 overflow-hidden text-[#F9FAFB] font-black ml-6 mb-12 lg:mb-10 border-0 resize-none outline-0"
                aria-label="Texto de entrada"
              ></textarea>
              <footer>
                <button className="p-1 border-2 border-[#4D5562] rounded-xl relative ml-4 mt-14">
                  <img className="w-6" src={sound} alt="som" />
                </button>
                <button
                  onClick={() => copying(translatedText)}
                  className="p-1 border-2 cursor-pointer z-10 border-[#4D5562] rounded-xl relative ml-2   mt-14"
                >
                  <img className="w-6" src={copy} alt="icone de cópia" />
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
