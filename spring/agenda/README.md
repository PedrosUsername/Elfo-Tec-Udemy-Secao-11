## Angular + Spring Boot: Udemy Fullstack
## Seção 11: Projeto agenda

### Pré-requisitos
Gerado em:
> https://start.spring.io/

com as seguintes configurações:
> Project: Maven Project;<br>
> Language: Java;<br>
> Spring Boot: 2.6.2;<br>
> Packing: Jar;<br>
> Java: 8;<br>
> Dependencies: ['Lombok', 'Spring-Web', 'Spring-Data-JPA', 'MySQL Driver', 'Spring Boot Dev Tools'];<br>

### Rodando o projeto localmente

Abra o terminal, e ponha o servidor para rodar com:
```
$ ./mvnw spring-boot:run
```

No terminal teste os end points os seguintes comandos:
+ Criar contato:
```
$ curl -i -X POST -H "Content-Type: application/json" -d '{ "name":"john", "email":"john@elfo.com"}' localhost:8080/api/contatos
```
+ Deletar contato:
```
$ curl -i -X DELETE localhost:8080/api/contatos/{ID_CONTATO}  
```
+ Favoritar contato:
```
$ curl -i -X PATCH localhost:8080/api/contatos/{ID_CONTATO}/favorito  
```


### Observações:

+ O audio do curso poderia ser melhor
