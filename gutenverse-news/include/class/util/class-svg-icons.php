<?php
/**
 * Svg_Icons trait
 *
 * Convenience methods to render SVG icons from Svg_Repository inside classes.
 *
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Util;

trait Svg_Icons {
	/**
	 * Get raw svg from repository.
	 *
	 * @param string $name Icon key.
	 * @return string
	 */
	protected function get_raw_svg( $name ) {
		return Svg_Repository::getRaw( $name );
	}

	/**
	 * Render an svg icon using the host class' render_icon method.
	 * Host class must implement render_icon($type, $class, $svg_base64).
	 *
	 * @param string $name  Icon key.
	 * @param string $class Optional class for icon. (deprecated)
	 * @return string
	 */
	protected function render_svg_icon( $name ) {
		$raw = Svg_Repository::getRaw( $name );
		// fallback: mimic gvnews_render_icon behaviour
		if ( ! empty( $raw ) ) {
			return '<div class="gutenverse-icon-svg">' . $raw . '</div>';
		}
		return '<i aria-hidden="true" class="' . esc_attr( $name ) . '"></i>';
	}
}
