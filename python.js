document.addEventListener('DOMContentLoaded', function () {
    // Apply CodeMirror to the Python input field
    const pyEditor = CodeMirror.fromTextArea(document.getElementById('pythonCode'), {
        mode: 'python', // Set mode to Python
        lineNumbers: true,
        matchBrackets: true,
        autoCloseBrackets: true,
        theme: 'dracula'
    });
  
    const outputElement = document.getElementById('output'); // Output area
  
    // Run Python code
    document.getElementById("runBtn").addEventListener("click", () => {
        const code = pyEditor.getValue(); // Get code from CodeMirror
        outputElement.innerText = ""; // Clear previous output
  
        // Configure Skulpt
        Sk.configure({
            output: (text) => {
                outputElement.innerText += text; // Append Python output
            },
            read: (filename) => {
                if (Sk.builtinFiles === undefined || Sk.builtinFiles["files"][filename] === undefined) {
                    throw `File not found: '${filename}'`;
                }
                return Sk.builtinFiles["files"][filename];
            },
        });
  
        // Execute Python code
        Sk.misceval
            .asyncToPromise(() => Sk.importMainWithBody("<stdin>", false, code))
            .then(() => console.log("Execution completed"))
            .catch((err) => {
                outputElement.innerText = `Error: ${err.toString()}`; // Show errors
            });
    });
  
    // Clear output
    document.getElementById('clearOutput').addEventListener('click', () => {
        outputElement.innerText = ''; // Clear output area
        console.log("OC");
        
    });
  
    // Save code
    document.getElementById('saveCode').addEventListener('click', () => {
        const code = pyEditor.getValue(); // Get code from CodeMirror
        const blob = new Blob([code], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'python_code.py'; // Set default filename
        a.click();
        console.log("SC");
        
    });
  });