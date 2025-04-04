package com.example.stage.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@Controller
@RestController
public class ContentController {

    @GetMapping("/req/login")
    public String login() {
        return "login"; // Assurez-vous que le fichier login.html existe
    }

    @GetMapping("/req/signup")
    public String signup() {
        return "signup"; // Assurez-vous que le fichier signup.html existe
    }

    @GetMapping("/index")
    public String home() {
        return "index"; // Assurez-vous que le fichier index.html existe
    }
}