package com.hoaxify.ws.obje;

import com.hoaxify.ws.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/api/1.0")
public class ObjeController {
    @Autowired
    ObjeService objeService;

    @PostMapping("/objes")
    GenericResponse saveObje(@Valid @RequestBody Obje obje) {
        objeService.save(obje);
        return new GenericResponse("Obje is saved");
    }

    @GetMapping("/objes")
    Page<Obje> getObjes(@PageableDefault(sort="id", direction= Sort.Direction.DESC) Pageable page) {
        return objeService.getObjes(page);
    }

}
