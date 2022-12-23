package com.hoaxify.ws.obje;

import com.hoaxify.ws.obje.vm.ObjeSubmitVM;
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
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/1.0")
public class ObjeController {
    @Autowired
    ObjeService objeService;

    @PostMapping("/objes")
    GenericResponse saveObje(@Valid @RequestBody ObjeSubmitVM obje, @CurrentUser User user) {
        objeService.save(obje, user);
        return new GenericResponse("Obje is saved");
    }

    @GetMapping("/objes")
    Page<ObjeVM> getObjes(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return objeService.getObjes(page).map(ObjeVM::new);
        //ObjeVM in constructorunu çağırarak bir json döndürüyor.
    }

    @GetMapping("/users/{username}/objes")
    Page<ObjeVM> getUserObjes(@PathVariable String username, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page) {
        return objeService.getObjesOfUser(username, page).map(ObjeVM::new);
    }

    @GetMapping({"/objes/{id:[0-9]+}", "/users/{username}/objes/{id:[0-9]+}"})
    ResponseEntity<?> getObjesRelative(@PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page,
                                       @PathVariable long id,
                                       @PathVariable(required = false) String username,
                                       @RequestParam(name = "count", required = false, defaultValue = "false") boolean count,
                                       @RequestParam(name = "direction", defaultValue = "before") String direction
    ) {
        if (count) {
            long newObjeCount = objeService.getNewObjesCount(id, username);
            Map<String, Long> response = new HashMap<>();
            response.put("count", newObjeCount); //clientta  böyle gözekecek
            return ResponseEntity.ok(response);
        }
        if (direction.equals("after")) {
            List<ObjeVM> newObjes = objeService.getNewObjes(id, username, page.getSort()) //yeniden eskiye istediğimiz için
                    .stream().map(ObjeVM::new).collect(Collectors.toList()); //akıştaki verileri mapleyip objeVM dönüştürüyorsun ve topladığın bi verileri listeye çeviriyorsun
            return ResponseEntity.ok(newObjes);
        }
        return ResponseEntity.ok(objeService.getOldObjes(id, username, page).map(ObjeVM::new));
    }

    @DeleteMapping("/objes/{id:[0-9]+}")
    @PreAuthorize("@objeSecurity.isAllowedToDelete(#id, principal)")
    GenericResponse deleteObje(@PathVariable long id) {
        objeService.delete(id);
        return new GenericResponse("Obje removed");
    }

//    @GetMapping("/users/{username}/objes/{id:[0-9]+}")
//    ResponseEntity<?> getUserObjesRelative(@PathVariable long id, @PathVariable String username, @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable page,@RequestParam(name="count", required = false, defaultValue = "false") boolean count,@RequestParam(name="direction", defaultValue = "before") String direction){
//        if(count){
//            long newObjeCount = objeService.getNewObjesCountOfUser(id,username);
//            Map<String,Long> response = new HashMap<>();
//            response.put("count",newObjeCount); //clientta  böyle gözekecek
//            return ResponseEntity.ok(response);
//        }
//        if(direction.equals("after")){
//            List<ObjeVM> newObjes = objeService.getNewObjesOfUser(id, username, page.getSort())
//                    .stream().map(ObjeVM::new).collect(Collectors.toList()); //akıştaki verileri mapleyip objeVM dönüştürüyorsun ve topladığın bi verileri listeye çeviriyorsun
//            return ResponseEntity.ok(newObjes);
//        }
//        return ResponseEntity.ok(objeService.getOldObjesOfUser(id, username, page).map(ObjeVM::new));

//}
}
