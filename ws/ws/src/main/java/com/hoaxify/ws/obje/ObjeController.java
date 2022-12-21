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
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.Map;

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

    @GetMapping("/users/{username}/objes")
    Page<ObjeVM> getUserObjes(@PathVariable String username, @PageableDefault(sort="id", direction= Sort.Direction.DESC) Pageable page){
        return objeService.getObjesOfUser(username, page).map(ObjeVM::new);
    }

    @GetMapping("/objes/{id:[0-9]+}")
    ResponseEntity<?> getObjesRelative(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page, @PathVariable long id, @RequestParam(name="count", required = false, defaultValue = "false") boolean count){
        if(count){
            long newObjeCount = objeService.getNewObjesCount(id);
            Map<String,Long> response = new HashMap<>();
            response.put("count",newObjeCount); //clientta  böyle gözekecek
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.ok(objeService.getOldObjes(id, page).map(ObjeVM::new));
    }

    @GetMapping("/users/{username}/objes/{id:[0-9]+}")
    Page<ObjeVM> getUserObjesRelative(@PathVariable long id, @PathVariable String username, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page){
        return objeService.getOldObjesOfUser(id, username, page).map(ObjeVM::new);
    }
}
