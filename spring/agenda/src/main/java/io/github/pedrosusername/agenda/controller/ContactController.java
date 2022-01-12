package io.github.pedrosusername.agenda.controller;

import io.github.pedrosusername.agenda.model.Contact;
import io.github.pedrosusername.agenda.model.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.http.fileupload.IOUtils;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Part;
import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contatos")
@CrossOrigin("http://localhost:4200")
@RequiredArgsConstructor
public class ContactController {

    private final ContactRepository repository;

    @GetMapping
    public List<Contact> list(){
        return repository.findAll();
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Contact save(@RequestBody Contact contact){
        return repository.save(contact);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete( @PathVariable Integer id ){
        repository.deleteById(id);
    }

    @PatchMapping("{id}/favorito")
    public void favorite( @PathVariable Integer id ){
        Optional<Contact> contato = repository.findById(id);
        contato.ifPresent( c -> {
            boolean fav = c.getFavorite() == Boolean.TRUE;
            c.setFavorite(!fav);
            repository.save(c);
        });
    }

    @PutMapping("{id}/foto")
    public byte[] addPhoto(@PathVariable Integer id,
                           @RequestParam("foto") Part arquivo){
        Optional<Contact> contato = repository.findById(id);
        return contato.map( c -> {
            try{
                InputStream is = arquivo.getInputStream();
                byte[] bytes = new byte[(int) arquivo.getSize()];
                IOUtils.readFully(is, bytes);
                c.setPic(bytes);
                repository.save(c);
                is.close();
                return bytes;
            }catch (IOException e){
                return null;
            }
        }).orElse(null);
    }
}
