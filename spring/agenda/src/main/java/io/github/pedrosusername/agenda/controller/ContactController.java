package io.github.pedrosusername.agenda.controller;

import io.github.pedrosusername.agenda.model.Contact;
import io.github.pedrosusername.agenda.model.ContactRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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
}
