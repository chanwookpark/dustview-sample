package framewise.sample.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@Configuration
@ComponentScan(useDefaultFilters = true,
        basePackages = {"framewise.sample"},
        excludeFilters = {@ComponentScan.Filter(value = {Controller.class, Configuration.class})})
@EnableTransactionManagement
public class AppContextConfig {


}
