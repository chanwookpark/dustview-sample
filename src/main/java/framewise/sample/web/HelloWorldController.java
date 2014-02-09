package framewise.sample.web;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;

import static framewise.dustview.SimpleDustTemplateView.*;

/**
 * Created by chanwook on 2014. 2. 1..
 */
@Controller
public class HelloWorldController {

    @RequestMapping(value = "/hello")
    public String sampleView(ModelMap model) {
        model.put(VIEW_FILE_PATH, "sample.html");
        model.put(CONTENT_KEY, "");
        model.put(TEMPLATE_KEY, "sample1");

        return "hello";
    }
}
