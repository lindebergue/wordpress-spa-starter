<?php
/**
 * Theme functions and actions.
 *
 * @package custom-theme
 * @author Àlef Lindebergue
 */

/**
 * Setup WordPress features required for the theme.
 */
function setup_wp_features() {
	if ( function_exists( 'acf_add_options_page' ) ) {
		acf_add_options_page( [
			'page_title' => 'Opções do Tema',
			'menu_title' => 'Opções do Tema',
			'menu_slug' => 'theme-options'
		] );
	}

	if ( current_user_can( 'manage_options' ) && ! get_option( 'has_setup_pages', false ) ) {
		$pages = [

		];
		foreach ( $pages as $page ) {
			wp_insert_post( [
				'post_title' => $page[ 'title'],
				'post_name' => $page[ 'slug' ],
				'post_type' => 'page',
				'post_status' => 'publish',
				'meta_input' => [
					'_wp_page_template' => $page[ 'template' ]
				]
			] );
		}
		update_option( 'has_setup_pages', true );
	}
}
add_action( 'init', 'setup_wp_features', 0 );

/**
 * Setup theme noticies and important messages.
 */
function setup_theme_notices() {
	if ( ! function_exists('acf_add_options_page') ) {
		echo '<div class="error"><p>Importante: O tema requer o plugin <a href="https://www.advancedcustomfields.com/">Advanced Custom Fields</a> para funcionar corretamente. <a href="' . admin_url( 'plugins.php' ) . '">Verifique</a> se o plugin está instalado e ativo.</p></div>';
	}

	if ( empty( get_option( 'permalink_structure' ) ) ) {
		echo '<div class="error"><p>Importante: O tema requer uma estrutura de links personalizada para funcionar corretamente. Defina uma nas <a href="' . admin_url( 'options-permalink.php' ) . '">configurações.</a></div>';
	}
}
add_action( 'admin_notices', 'setup_theme_notices' );

/**
 * Setup theme specific features.
 */
function setup_theme() {
	add_theme_support( 'post-thumbnails' );

	add_theme_support( 'html5', [
		'search-form',
		'comment-form',
		'comment-list',
		'gallery',
		'caption',
	] );

	show_admin_bar( false );
}
add_action( 'after_setup_theme', 'setup_theme' );

/**
 * Enqueue theme scripts and stylesheets.
 */
function enqueue_theme_scripts() {
	if ( WP_DEBUG ) {
		wp_enqueue_style( 'theme-dev-style', 'http://localhost:8081/main.css' );
		wp_enqueue_script( 'theme-dev-vendor-script', 'http://localhost:8081/vendor.js', [], '', true );
		wp_enqueue_script( 'theme-dev-polyfills-script', 'http://localhost:8081/polyfills.js', [], '', true );
		wp_enqueue_script( 'theme-dev-main-script', 'http://localhost:8081/main.js', [], '', true );
	} else {
		wp_enqueue_style( 'theme-style', get_template_directory_uri() . '/dist/main.css' );
		wp_enqueue_script( 'theme-vendor-script', get_template_directory_uri() . '/dist/vendor.js', [], '', true );
		wp_enqueue_script( 'theme-polyfills-script', get_template_directory_uri() . '/dist/polyfills.js', [], '', true );
		wp_enqueue_script( 'theme-main-script', get_template_directory_uri() . '/dist/main.js', [], '', true );
	}
}
add_action( 'wp_enqueue_scripts', 'enqueue_theme_scripts' );

/**
 * Register theme specific REST routes.
 */
function register_rest_routes() {
	register_rest_route( 'theme/v1', '/nav_menu/(?P<slug>[a-z\-]+)', [
		'methods' => 'GET',
		'callback' => function ( $request ) {
			$locations = get_nav_menu_locations();
			if ( ! empty( $locations ) && ! empty( $locations[ 'menu' ] ) ) {
				$menu = get_term( $locations[ 'menu' ] );
				return wp_get_nav_menu_items( $menu->term_id );
			}
			return new WP_REST_Response( null, 404 );
		}
	] );

	register_rest_route( 'theme/v1', '/theme_options', [
		'methods' => 'GET',
		'callback' => function ( $request ) {
			return [];
		}
	] );
}
add_action( 'rest_api_init', 'register_rest_routes' );

/**
 * Setup Advanced Custom Fields features required for the theme.
 */
function setup_acf_features() {
	acf_add_local_field_group( [
		'key' => 'theme_options',
		'title' => 'Opções do Tema',
		'location' => [
			[
				[
					'param' => 'options_page',
					'operator' => '==',
					'value' => 'theme-options',
				],
			],
		],
		'fields' => [
		]
	] );
}
add_action( 'acf/init', 'setup_acf_features' );
