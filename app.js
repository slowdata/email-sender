const nodemailer = require("nodemailer");

const timeInDay = 24 * 60 * 60 * 1000;
const dateOfPickUp = new Date("2018-11-5");
const currentDate = new Date();
const numOfDays = Math.floor(
  Math.abs((dateOfPickUp.getTime() - currentDate.getTime()) / timeInDay)
);

const greeting = currentDate.getHours() < 12 ? "Bom dia" : "Boa tarde";
console.log(currentDate.getHours(), greeting);

const output = `
    <h4>${greeting},</h4>
    <p>Venho pelo presente informar que continuo aguardar informações relativamente 
    a máquina de lavar loiça que foi levantada em:</p>
    <h3>05 de Novembro de 2018</h5>
    <p>Estou neste momento sem informação há:</p>
    <h2>${numOfDays}</h2>
    <br />
    <p>P.S. - Esta mensagem será enviada todos os dias com o intuito de lembrar V. Exas
    para a falta de resposta e do vosso horrivel serviço!</p>
`;

if (process.env.NODE_ENV !== "development") {
  async function send() {
    let account = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp-mail.outlook.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "ricardo.dias@outlook.com", // generated ethereal user
        pass: "outlookrd9825" // generated ethereal password
      }
    });

    // setup email data with unicode symbols
    let mailOptions = {
      from: '"Ricardo Dias" <ricardo.dias@outlook.com>', // sender address
      to:
        "atencao_ao_cliente@whirlpool.com, slo.motion@gmail.com, svharten@gmail.com", // list of receivers
      subject: "Falta de resposta da reclamaçao", // Subject line
      text: "Hello world?", // plain text body
      html: output // html body
    };

    // send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

  send().catch(console.error);
} else {
  console.log(`
    > Running in development mode!
    > The email to send should look like this:
    > ${output}
  `);
}
