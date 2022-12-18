package com.hoaxify.ws.obje;

import com.hoaxify.ws.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
public class ObjeController {
    @Autowired
    ObjeService objeService;

    @PostMapping("/api/1.0/objes")
    GenericResponse saveObje(@Valid @RequestBody Obje obje){
        objeService.save(obje);
        return new GenericResponse("Obje is saved");
    }

}
