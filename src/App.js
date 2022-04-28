import React, { useRef, useState, useCallback, useEffect } from "react";

const useChangeView = (options) => {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);
    if (ref) observer.observe(ref);

    return () => {
      if (ref) observer.unobserve(ref);
    };
  }, [ref, options]);

  return { setRef, visible };
};

const App = () => {
  // const ref = { current: null };
  // const visible = false;

  const { setRef, visible } = useChangeView({ threshold: 0.2 });
  return (
    <div>
      <div style={{ height: "100vh" }}>
        <h1>
          Scroll down to the next section{" "}
          <span role="img" aria-label="pointing down">
            &#128071;
          </span>
        </h1>
      </div>
      <div
        ref={setRef}
        style={{
          height: "100vh",
          transition: "all 1s ease-in",
          backgroundColor: visible ? "pink" : "lightGray",
        }}
      >
        {visible ? (
          <h1>
            I'm Visible
            <span role="img" aria-label="pointing up">
              &#9757;
            </span>
          </h1>
        ) : (
          <h1>
            you need to change this page
            <span role="img" aria-label="pointing down">
              &#128071;
            </span>
          </h1>
        )}
      </div>
    </div>
  );
};

export default App;
