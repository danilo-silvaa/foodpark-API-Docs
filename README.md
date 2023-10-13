## FOOD PARK - Documentação API

Documentação para uso dos endpoints da API.

Endereço de acesso: [https://plankton-app-96hra.ondigitalocean.app/](https://plankton-app-96hra.ondigitalocean.app/)

## Seções

- [Autenticar um admin](#autenticar-um-admin)

- [Obter dados do admin](#obter-dados-do-admin)

- [Obter Estatísticas](#obter-estatísticas)

- [Criar Transação](#criar-transação)

- [Obter Transações](#obter-transações)

- [Atualizar Transações](#atualizar-transações)

- [Deletar Transação](#deletar-transação)

## Autenticar um admin

* **URL**

  `/login`

* **Método**

  `POST`

* **Parâmetros**

    | Atributo   | Tipo do dado   | Descrição                                  | Obrigatório     |
    |------------|----------------|------------------------------------------- |-----------------|
    | email      | string         | Endereço de e-mail do admin              | sim             |
    | password   | string         | Senha do admin                           | sim             |
    | recaptcha  | string         | Token do Google reCAPTCHA                  | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

-----

## Obter dados do admin

* **URL**

  `/admin`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | Authorization   | bearer         | Token de autenticação do admin             | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "name": "Example",
        "email": "Example@example.com"
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
    | Authorization   | bearer         | Token de autenticação do admin             | sim             |

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
    | Authorization   | bearer         | Token de autenticação do admin                 | sim             |
    | description     | string         | Descrição da transação                         | sim             |
    | price           | int            | Valor da transação                             | sim             |
    | type            | boolean        | Tipo da transação (defina apenas se for saída) | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "id": 1,
        "description": "Cachorro Quente",
        "price": 1000,
        "type": true,
        "createdAt": "2023-10-11T22:23:36.231Z",
        "updatedAt": "2023-10-11T22:23:36.231Z"
    }
    ```

-----

## Obter Transações

* **URL**

  `/transactions/:pageNum`

* **Método**

  `GET`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | Authorization   | bearer         | Token de autenticação do admin             | sim             |
    | pageNum         | int            | Numero da página atual                     | não             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "total": 2,
        "totalPages": 1,
        "transactions": [
            {
                "id": 1,
                "description": "Hot Dog",
                "price": 500,
                "type": true,
                "createdAt": "2023-10-11T21:15:15.088Z",
                "updatedAt": "2023-10-11T21:15:15.088Z"
            },
            {
                "id": 2,
                "description": "Cachorro Quente",
                "price": 1000,
                "type": true,
                "createdAt": "2023-10-11T22:23:36.231Z",
                "updatedAt": "2023-10-11T22:23:36.231Z"
            }
        ]
    }
    ```

-----

## Atualizar Transações

* **URL**

  `/transaction`

* **Método**

  `PUT`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                      | Obrigatório     |
    |-----------------|----------------|------------------------------------------------|-----------------|
    | Authorization   | bearer         | Token de autenticação do admin                 | sim             |
    | description     | string         | Descrição da transação                         | sim             |
    | price           | int            | Valor da transação                             | sim             |
    | type            | boolean        | Tipo da transação (defina apenas se for saída) | não             |

* **Retornos**
  
  **Status Code:** 200
  
    ```json
    {
        "id": 1,
        "description": "Cachorro Quente",
        "price": 1000,
        "type": false,
        "createdAt": "2023-10-11T21:15:15.088Z",
        "updatedAt": "2023-10-11T22:37:17.473Z"
    }
    ```

-----

## Deletar Transação

* **URL**

  `/transaction/:id`

* **Método**

  `DELETE`

* **Parâmetros**

    | Atributo        | Tipo do dado   | Descrição                                  | Obrigatório     |
    |-----------------|----------------|------------------------------------------- |-----------------|
    | Authorization   | bearer         | Token de autenticação do admin             | sim             |
    | id              | int            | Id da transação                            | sim             |

* **Retornos**
  
  **Status Code:** 200
  
    ```text
    Transaction deleted successfully.
    ```

-----