import { useEffect, useMemo, useState } from "react";
import "./style.scss";
import { useDispatch, useSelector } from "react-redux";
import { getLanguages, translateText } from "./redux/translateAction";
import Select from "react-select";
import { setTranslated } from "./redux/translateSlice";

const App = () => {
  const state = useSelector((store) => store.translate);

  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const [sourceLang, setSourceLang] = useState({
    label: "Turkish",
    value: "tr",
  });
  const [targetLang, setTargetLang] = useState({
    label: "English",
    value: "en",
  });

  useEffect(() => {
    dispatch(getLanguages());
  }, []);

  const refinedData = useMemo(
    () =>
      state.languages.map((lang) => ({
        label: lang.name,
        value: lang.code,
      })),
    [state.languages]
  );

  const handleSwap = () => {
    setTargetLang(sourceLang);
    setSourceLang(targetLang);

    setText(state.translatedText);
    dispatch(setTranslated(text));
  };

  return (
    <div id="main-page">
      <div className="container">
        <h1>Çeviri+</h1>
        <div className="upper">
          <Select
            className="select"
            onChange={setSourceLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={sourceLang}
          />
          <button onClick={handleSwap}>Değiştir</button>
          <Select
            className="select"
            onChange={setTargetLang}
            isLoading={state.isLangsLoading}
            isDisabled={state.isLangsLoading}
            options={refinedData}
            value={targetLang}
          />
        </div>

        <div className="middle">
          <div>
            <textarea value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            {state.isTranslateLoading && (
              <ul className="wave-menu">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
            )}
            <textarea value={state.translatedText} disabled />
          </div>
        </div>

        <button
          onClick={() =>
            dispatch(translateText({ sourceLang, targetLang, text }))
          }
        >
          Çevir
        </button>
      </div>
    </div>
  );
};

export default App;
