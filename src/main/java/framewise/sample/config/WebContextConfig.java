package framewise.sample.config;

import framewise.dustview.ClasspathSupportFileSystemDustTemplateLoader;
import framewise.dustview.SimpleDustTemplateView;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.stereotype.Controller;
import org.springframework.web.servlet.View;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.BeanNameViewResolver;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * @author chanwook
 */
@Configuration
@EnableWebMvc
@ComponentScan(basePackages = {"framewise.sample"}, useDefaultFilters = false,
        includeFilters = {@ComponentScan.Filter(value = {Controller.class})})
public class WebContextConfig extends WebMvcConfigurerAdapter {

    private static final Logger LOGGER = LoggerFactory.getLogger(WebContextConfig.class);

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.TEXT_HTML);
        configurer.favorParameter(false);
        configurer.favorPathExtension(false);
        configurer.ignoreAcceptHeader(false);
    }

    @Bean
    public ViewResolver getCnvr() {
        ContentNegotiatingViewResolver viewResolver = new ContentNegotiatingViewResolver();

        // Setting to ViewResolver List
        ArrayList<ViewResolver> viewResolvers = new ArrayList<ViewResolver>();
        viewResolvers.add(getDustViewResolver());
        viewResolvers.add(new BeanNameViewResolver());
        viewResolver.setViewResolvers(viewResolvers);

        // Setting to Default View
        ArrayList<View> defaultViews = new ArrayList<View>();
        defaultViews.add(new MappingJackson2JsonView());
        viewResolver.setDefaultViews(defaultViews);

        return viewResolver;
    }

    @Bean
    public ViewResolver getDustViewResolver() {
        LOGGER.debug(">>> Setup View Resolver for JSP");

        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setPrefix("/WEB-INF/view/");
        viewResolver.setSuffix(".jsp");
        viewResolver.setViewClass(SimpleDustTemplateView.class);

        // set attribute for View instance
        HashMap<String, Object> attributes = new HashMap<String, Object>();
        attributes.put(SimpleDustTemplateView.DUST_JS_CORE_FILE_PATH, "/dust/dust-full-2.2.3.js");
        attributes.put(SimpleDustTemplateView.DUST_JS_HELPER_FILE_PATH, "");
//        HttpConnectDustTemplateLoader dustTemplateLoader = new HttpConnectDustTemplateLoader();
        ClasspathSupportFileSystemDustTemplateLoader dustTemplateLoader = new ClasspathSupportFileSystemDustTemplateLoader();
        attributes.put(SimpleDustTemplateView.TEMPLATE_LOADER, dustTemplateLoader);
        attributes.put(SimpleDustTemplateView.VIEW_PATH_PREFIX, "/dust/sample/");
        attributes.put(SimpleDustTemplateView.VIEW_PATH_SUFFIX, "");
        attributes.put(SimpleDustTemplateView.VIEW_CACHEABLE, "false");
        attributes.put(SimpleDustTemplateView.DUST_COMPILED, "false");

        viewResolver.setAttributesMap(attributes);

        return viewResolver;
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        converters.add(new MappingJackson2HttpMessageConverter());
    }

}
