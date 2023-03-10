<?php

use Twig\Environment;
use Twig\Error\LoaderError;
use Twig\Error\RuntimeError;
use Twig\Extension\SandboxExtension;
use Twig\Markup;
use Twig\Sandbox\SecurityError;
use Twig\Sandbox\SecurityNotAllowedTagError;
use Twig\Sandbox\SecurityNotAllowedFilterError;
use Twig\Sandbox\SecurityNotAllowedFunctionError;
use Twig\Source;
use Twig\Template;

/* login/header.twig */
class __TwigTemplate_c4e80a3821cb692d1ad130a394bbf3f1962ae16232b02b741e3c76f002c1f676 extends \Twig\Template
{
    private $source;
    private $macros = [];

    public function __construct(Environment $env)
    {
        parent::__construct($env);

        $this->source = $this->getSourceContext();

        $this->parent = false;

        $this->blocks = [
        ];
    }

    protected function doDisplay(array $context, array $blocks = [])
    {
        $macros = $this->macros;
        // line 1
        echo "<div class=\"container\">
<a href=\"";
        // line 2
        echo twig_escape_filter($this->env, PhpMyAdmin\Core::linkURL("https://www.phpmyadmin.net/"), "html", null, true);
        echo "\" target=\"_blank\" rel=\"noopener noreferrer\" class=\"logo\">
<img src=\"";
        // line 3
        echo twig_escape_filter($this->env, twig_get_attribute($this->env, $this->source, ($context["theme"] ?? null), "getImgPath", [0 => "logo_right.png", 1 => "pma_logo.png"], "method", false, false, false, 3), "html", null, true);
        echo "\" id=\"imLogo\" name=\"imLogo\" alt=\"phpMyAdmin\" border=\"0\" />
</a>
<h1>";
        // line 5
        echo twig_sprintf(_gettext("Welcome to %s"), "<bdo dir=\"ltr\" lang=\"en\">phpMyAdmin</bdo>");
        echo "</h1>

<noscript>
";
        // line 8
        echo $this->env->getFunction('Message_error')->getCallable()(_gettext("Javascript must be enabled past this point!"));
        echo "
</noscript>

<div class=\"hide\" id=\"js-https-mismatch\">
";
        // line 12
        echo $this->env->getFunction('Message_error')->getCallable()(_gettext("There is mismatch between HTTPS indicated on the server and client. This can lead to non working phpMyAdmin or a security risk. Please fix your server configuration to indicate HTTPS properly."));
        echo "
</div>
";
    }

    public function getTemplateName()
    {
        return "login/header.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  62 => 12,  55 => 8,  49 => 5,  44 => 3,  40 => 2,  37 => 1,);
    }

    public function getSourceContext()
    {
        return new Source("", "login/header.twig", "D:\\Proj\\proj-dev\\default\\phpMyAdmin-4.9.11-all-languages\\templates\\login\\header.twig");
    }
}
