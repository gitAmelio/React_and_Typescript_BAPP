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
                    root.innerHTML = '<div style="color: blue"><h4>Runtime Error</h4>'+ err + '</div>';
                    rethrow error to console
                    // console.error(err);
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
    setTimeout(()=>{
      // updating changed code - see #root event listener above
      iframe.current.contentWindow.postMessage(code, "*"); // need to match targetOrigin, "*" don't check
    },50)
  }, [code]);

  return (
    <div className="preview-wrapper flex-child">
      <iframe
        
        style={{ background: 'white', width: '100%', height: '100%'}}
        title="code preview"
        ref={iframe}
        sandbox="allow-scripts"
        srcDoc={html}
      />
    </div>

  );
};

export default Preview;
