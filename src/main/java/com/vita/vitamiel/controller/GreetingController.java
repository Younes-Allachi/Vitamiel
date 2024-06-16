package com.vita.vitamiel.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.context.MessageSource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/greeting")
@RequiredArgsConstructor
public class GreetingController {
    private final MessageSource messageSource;
    //@Autowired
    //private  MyLocaleResolver myLocaleResolver;

    //@GetMapping
   // public String greeting(HttpServletRequest request){
       // return messageSource.getMessage("greeting", null, myLocaleResolver.resolveLocale(request));
    //}


}
