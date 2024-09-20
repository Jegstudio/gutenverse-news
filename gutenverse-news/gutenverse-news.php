<?php
/**
 * Plugin Name: Gutenverse News
 * Description: Powerful and intuitive News Block designed to streamline the process of creating WordPress news website.
 * Plugin URI: https://gutenverse.com/
 * Author: Jegstudio
 * Version: 1.0.2
 * Author URI: https://jegtheme.com/
 * License: GPLv3
 * Text Domain: gutenverse-news
 *
 * @package gutenverse-news
 */

defined( 'GUTENVERSE_NEWS' ) || define( 'GUTENVERSE_NEWS', 'gutenverse-news' );
defined( 'GUTENVERSE_NEWS_VERSION' ) || define( 'GUTENVERSE_NEWS_VERSION', '1.0.2' );
defined( 'GUTENVERSE_NEWS_NOTICE_VERSION' ) || define( 'GUTENVERSE_NEWS_NOTICE_VERSION', '1.0.0' );
defined( 'GUTENVERSE_NEWS_NAME' ) || define( 'GUTENVERSE_NEWS_NAME', 'Gutenverse News' );
defined( 'GUTENVERSE_NEWS_FILE' ) || define( 'GUTENVERSE_NEWS_FILE', __FILE__ );
defined( 'GUTENVERSE_NEWS_URL' ) || define( 'GUTENVERSE_NEWS_URL', plugins_url( GUTENVERSE_NEWS ) );
defined( 'GUTENVERSE_NEWS_DIR' ) || define( 'GUTENVERSE_NEWS_DIR', plugin_dir_path( GUTENVERSE_NEWS_FILE ) );
defined( 'GUTENVERSE_NEWS_CLASSPATH' ) || define( 'GUTENVERSE_NEWS_CLASSPATH', GUTENVERSE_NEWS_DIR . 'include/class/' );
defined( 'GUTENVERSE_NEWS_LANG_DIR' ) || define( 'GUTENVERSE_NEWS_LANG_DIR', GUTENVERSE_NEWS_DIR . '/languages/' );

// This constant has been deprecated as of Gutenverse Core v1.0.6 and Gutenverse News v1.0.2.
// Use GUTENVERSE_FRAMEWORK_URL_PATH instead.
defined( 'GUTENVERSE_FRAMEWORK_URL' ) || define( 'GUTENVERSE_FRAMEWORK_URL', GUTENVERSE_NEWS_URL . '/lib/framework' );

require_once GUTENVERSE_NEWS_DIR . 'include/autoload.php';
require_once GUTENVERSE_NEWS_DIR . 'include/helper.php';

GUTENVERSE\NEWS\Init::instance();
