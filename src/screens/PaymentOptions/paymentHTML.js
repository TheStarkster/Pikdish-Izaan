function generateHTML(data) {
  let el = '';

  data.fields.forEach(item => {
      el += `<input type="hidden" name="${item.label}" value="${item.value}">`
  })

  return `
        <html>
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Document</title>
            </head>
            <body>
                <h1>Loading...</h1>
                <form method="post" action="${data.redirectUrl}" name="paytm">
                    ${el}
                    <script type="text/javascript">
                        document.paytm.submit();
                    </script>
                </form>
            </body>
        </html>
    `;
}

export default {generateHTML};
