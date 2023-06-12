import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html = `
<html>
    <head></head>
    <body>
        <div id="root"></div>
        <script>
            window.addEventListener('message', (event) => {
                try {
                    eval(event.data);
                } catch (err) {
                    const root = document.querySelector('#root');
                    root.innerHTML = '<div style="color: red"><h4>Runtime Error</h4>'+ err + '</div>';
                    // rethrow error to console
                    console.error(err);
                }
            }, false);
        </script>
    </body>
</html>
`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();

  // on 'code' changed
  useEffect(() => {
    // reset iframe
    iframe.current.srcdoc = html;

    // updating changed code;
    iframe.current.contentWindow.postMessage(code, "*"); // need to match targetOrigin, "*" don't check
  }, [code]);

  return (
    <iframe
      title="code preview"
      ref={iframe}
      sandbox="allow-scripts"
      srcDoc={html}
    />
  );
};

export default Preview;
