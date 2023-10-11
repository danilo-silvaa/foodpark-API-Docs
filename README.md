## FOOD PARK - Documentação API

Documentação para uso dos endpoints da API.

Endereço de acesso: [https://foodpark-qtgd.onrender.com/v1](https://foodpark-qtgd.onrender.com/v1)

## Seções

- [Autenticar um usuário](#autenticar-um-usuário)

## Autenticar um usuário

### Autentica um usuário e gera um token de acesso.

* **URL**

  `/login`

* **Método**

  `POST`

* **Parâmetros**

    | Atributo   | Tipo do dado   | Descrição                                  | Obrigatório     |
    |------------|----------------|------------------------------------------- |-----------------|
    | email      | string         | Endereço de e-mail do usuário              | sim             |
    | password   | string         | Senha do usuário                           | sim             |
    | recaptcha  | string         | Token do Google reCAPTCHA                  | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..."
    }
    ```

-----