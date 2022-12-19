package com.hoaxify.ws.obje;

import com.hoaxify.ws.obje.vm.ObjeVM;
import com.hoaxify.ws.shared.CurrentUser;
import com.hoaxify.ws.shared.GenericResponse;
import com.hoaxify.ws.user.User;
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
    GenericResponse saveObje(@Valid @RequestBody Obje obje,@CurrentUser User user) {
        objeService.save(obje,user);
        return new GenericResponse("Obje is saved");
    }

    @GetMapping("/objes")
    Page<ObjeVM> getObjes(@PageableDefault(sort="id", direction= Sort.Direction.DESC) Pageable page) {
        return objeService.getObjes(page).map(ObjeVM::new);
        //ObjeVM in constructorunu çağırarak bir json döndürüyor.
    }

}
