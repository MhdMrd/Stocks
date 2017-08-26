
package org.mourad.stocks.security;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 *
 * @author Mourad<mohammadabdoulahi@gmail.com>
 */
@Controller
public class WebController{
    @RequestMapping("/login")
    public String login(){
        return "login";
    }
}
