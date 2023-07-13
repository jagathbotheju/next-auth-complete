interface Props {
  url: string;
  text: string;
}

export function html({ url, text }: Props) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Confirm Email Address</title>
      <body>
        <div
          style="
            max-width: 700px;
            margin: auto;
            border: 10px solid #ddd;
            padding: 50px 20px;
            font-size: 110%;
          "
        >
          <h2 style="text-align: center; text-transform: capitalize; color: teal">
            Welcome to MyAuthApp
          </h2>
          <p>Congratulations! You are almost set to start using MyAuthApp.</p>
          <p>Just click the button below to validate your email address</p>
          <a
            href=${url}
            style="
              background: crimson;
              text-decoration: none;
              color: white;
              padding: 10px 20px;
              margin: 10px 0;
              display: inline-block;
            "
            >${text}</a
          >
          <p>
            If the button does not working for any reason, you can also click on
            the link below
          </p>
          <div>${url}</div>
        </div>
      </body>
    </head>
    <body></body>
  </html>
  
  `;
}