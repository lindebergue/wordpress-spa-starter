<?php
/**
 * Theme header template.
 *
 * @package custom-theme
 * @author Àlef Lindebergue
 */
?>
<!doctype html>
<html <?php language_attributes(); ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); ?>">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<?php wp_head(); ?>
</head>
<body>
	<div id="react-root"></div>
