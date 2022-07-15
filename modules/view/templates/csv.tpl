<!DOCTYPE html>
<html lang="en">
    <head>
        <title>Hello KIWI</title>
        <meta charset="UTF-8" />
        <script type="text/javascript">
            async function sendForm(form) {
              const formData = new FormData();
              const xhr = new XMLHttpRequest()
              const url = window.location.href;

              formData.append('file', form.file.files[0]);
              xhr.open('post', url, true);
              xhr.onload = function () {
                if (xhr.readyState === 4) {
                  alert('DONE!')
                }
              }
              xhr.onabort = function () {
                alert('ABORTED')
              }
              xhr.onerror = function () {
                alert('ERROR')
              }
              xhr.setRequestHeader('Content-Type','multipart/form-data');
              xhr.send(formData);
            }
        </script>
        <style>
            body {
                font-family: Tahoma, Verdana,sans-serif;
            }
            form {
                margin: 20px auto;
                width: 500px;
                padding: 20px;
                background-color: lightcyan;
                border: 4px solid darkcyan;
            }
            label {
                display: block;
                margin-bottom: 10px;
                cursor: pointer;
            }
            input {
                border: 1px solid darkcyan;
                padding: 4px;
                background-color: floralwhite;
                display: block;
                width: 100%;
                -webkit-box-sizing: border-box;
                -khtml-box-sizing: border-box;
                -moz-box-sizing: border-box;
                -ms-box-sizing: border-box;
                -o-box-sizing: border-box;
                box-sizing: border-box;
            }
            button {
                padding: 10px;
                text-align: center;
                background-color: darkcyan;
                border: 2px solid darkcyan;
                color: white;
                cursor: pointer;
                margin: 10px auto;
                -webkit-border-radius: 4px;
                -khtml-border-radius: 4px;
                -moz-border-radius: 4px;
                -ms-border-radius: 4px;
                -o-border-radius: 4px;
                border-radius: 4px;
            }
            button:hover {
                background-color: black;
            }
        </style>
    </head>
    <body>
        <form method="post" onsubmit="sendForm(this);return false;">
            <label for="file">Upload file</label>
            <input id="file" type="file" name="file" required />
            <button type="submit" name="submit">Import</button>
        </form>
    </body>
</html>
