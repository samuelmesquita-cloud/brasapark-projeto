import { api } from "./api.js";

await api.createAtracao(atracao); 

const form =
  document.getElementById(
    "form-atracao"
  );

form.addEventListener(
  "submit",

  async (e) => {

    e.preventDefault();

    const atracao = {

      nome:
        document.getElementById(
          "nome"
        ).value,

      descricao:
        document.getElementById(
          "descricao"
        ).value,

      tipo:
        document.getElementById(
          "tipo"
        ).value,

      alturaMin: Number(
        document.getElementById(
          "alturaMin"
        ).value
      ),

      capacidade: Number(
        document.getElementById(
          "capacidade"
        ).value
      ),

      status:
        document.getElementById(
          "status"
        ).value
    };

    await createAtracao(
      atracao
    );

    alert(
      "Atração cadastrada!"
    );

    form.reset();
  }
);
