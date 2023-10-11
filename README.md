## FOOD PARK - Documentação API

Documentação para uso dos endpoints da API.

Endereço de acesso: [https://foodpark-qtgd.onrender.com/v1](https://foodpark-qtgd.onrender.com/v1)

## Seções

- [Autenticar um usuário](#autenticar-um-usuário)

- [Obter Estatísticas](#obter-estatísticas)

- [Criar Transação](#criar-transação)

## Autenticar um usuário

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
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

-----

## Obter Estatísticas

* **URL**

  `/statistics`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | Authorization   | bearer         | Token de autenticação do usuário           | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "profit": {
            "all": 1000,
            "day": 1000,
            "month": 1000
        },
        "expenses": {
            "all": 0,
            "day": 0,
            "month": 0
        }
    }
    ```

-----


## Criar Transação

* **URL**

  `/transaction`

* **Método**

  `POST`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                      | Obrigatório     |
    |-----------------|----------------|------------------------------------------------|-----------------|
    | Authorization   | bearer         | Token de autenticação do usuário               | sim             |
    | description     | string         | Descrição da transação                         | sim             |
    | price           | int            | Valor da transação                             | sim             |
    | type            | bolean         | Tipo da transação (defina apenas se for saída) | não             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "id": 1,
        "description": "Cachoro Quente",
        "price": 1000,
        "type": true,
        "createdAt": "2023-10-11T22:23:36.231Z",
        "updatedAt": "2023-10-11T22:23:36.231Z"
    }
    ```

-----