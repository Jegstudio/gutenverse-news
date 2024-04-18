<?php
/**
 * Hero View Abstract
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Hero;

use GUTENVERSE\NEWS\Block\Block_View_Abstract;
use GUTENVERSE\NEWS\Util\Image\Image_Background_Load;

/**
 * Hero_View_Abstract
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
abstract class Hero_View_Abstract extends Block_View_Abstract {


	/**
	 * Margin
	 *
	 * @var mixed
	 */
	protected $margin;

	/**
	 * Number post
	 *
	 * @var int
	 */
	protected $number_post = 0;

	/**
	 * Method get_number_post
	 *
	 * @return integer
	 */
	public function get_number_post() {
		return isset( $this->attribute['number_post'] ) ? $this->attribute['number_post'] : $this->number_post;
	}

	/**
	 * Method render_content
	 *
	 * @param array $result result.
	 *
	 * @return integer
	 */
	public function render_content( $result ) {
		return ! empty( $result ) ? $this->render_element( $result ) : $this->empty_content();
	}

	/**
	 * Method remove_px
	 *
	 * @param string $string string.
	 *
	 * @return string
	 */
	public function remove_px( $string ) {
		return str_replace( 'px', '', $string );
	}

	/**
	 * Method get_thumbnail
	 *
	 * @param integer $id   id.
	 * @param string  $size size.
	 *
	 * @return string
	 */
	public function get_thumbnail( $id, $size ) {
		$prioritize = isset( $this->attribute['force_normal_image_load'] ) && ( 'true' === $this->attribute['force_normal_image_load'] || 'yes' === $this->attribute['force_normal_image_load'] );
		$image      = Image_Background_Load::get_instance();
		return $image->single_hero_image( $id, $size, $prioritize );
	}

	/**
	 * Method render_output
	 *
	 * @param array  $result       result.
	 * @param array  $attr         attribute attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_output( $result, $attr, $column_class ) {
		$this->margin = isset( $attr['hero_margin']['size'] ) ? $attr['hero_margin']['size'] : $attr['hero_margin'];
		$content      = $this->render_output_loop( $result );
		$name         = strtolower( substr( $attr['short_code'], strrpos( $attr['short_code'], '_' ) + 1 ) );
		$data_attr    = $this->data_attr( $attr );

		if ( isset( $attr['hero_type'] ) ) {
			$name = $attr['hero_type'];
		}

		if ( isset( $attr['hero_slider_enable'] ) && $attr['hero_slider_enable'] ) {
			$attr['el_class'] .= ' tiny-slider';
		}

		$html_classes = gvnews_build_html_classes(
			array(
				'gvnews_heroblock',
				'gvnews_heroblock_' . esc_attr( $name ),
				esc_attr( $column_class ),
				esc_attr( $attr['hero_style'] ),
				esc_attr( $this->unique_id ),
				esc_attr( $this->get_vc_class_name() ),
				esc_attr( $attr['el_class'] ),
			)
		);

		return "<div {$this->element_id($attr)} class=\"" . $html_classes . '" data-margin="' . esc_attr( $this->margin ) . "\" {$data_attr}>
                {$content}
            </div>";
	}

	/**
	 * Method render_output_loop
	 *
	 * @param array $result result.
	 *
	 * @return string
	 */
	public function render_output_loop( $result ) {
		$output         = '';
		$result         = array_chunk( $result, $this->get_number_post() );
		$is_skew_slider = ( strpos( strtolower( $this->attribute['short_code'] ), 'skew' ) !== false ) && ( isset( $this->attribute['hero_slider_enable'] ) && $this->attribute['hero_slider_enable'] );

		$output = '<div class="gvnews_hero_wrapper">';
		foreach ( $result as $item ) {
			if ( $is_skew_slider ) {
				$output .=
				'<div class="gvnews_heroblock_wrapper_skew">
                    <div class="gvnews_heroblock_wrapper">
                        ' . $this->render_content( $item ) . '
                    </div>
                </div>';
			} else {
				$output .=
				'<div class="gvnews_heroblock_wrapper">
	                ' . $this->render_content( $item ) . '
	            </div>';
			}
		}
		$output .= '</div>';

		return $output;
	}

	/**
	 * Method data_attr
	 *
	 * @param array $attr attribute attribute.
	 *
	 * @return string
	 */
	public function data_attr( $attr ) {
		$output = '';

		if ( isset( $attr['hero_slider_enable'] ) && $attr['hero_slider_enable'] ) {
			$hero_slider_delay = isset( $attr['hero_slider_delay']['size'] ) ? $attr['hero_slider_delay']['size'] : esc_attr( $attr['hero_slider_delay'] );

			$output .= isset( $attr['hero_slider_auto_play'] ) && $attr['hero_slider_auto_play'] ? ' data-autoplay="' . esc_attr( $attr['hero_slider_auto_play'] ) . '""' : '';
			$output .= ! empty( $hero_slider_delay ) ? ' data-delay="' . $hero_slider_delay . '""' : '';
		}

		return $output;
	}

	/**
	 * Method render_module
	 *
	 * @param string $attr         attribute.
	 * @param string $column_class column_class.
	 *
	 * @return string
	 */
	public function render_module( $attr, $column_class ) {
		$this->attribute                = $attr;
		$attr['number_post']            = $this->get_number_post();
		$attr['pagination_number_post'] = 0;

		if ( isset( $attr['hero_slider_enable'] ) && $attr['hero_slider_enable'] ) {
			$hero_slider_item    = isset( $attr['hero_slider_item']['size'] ) ? $attr['hero_slider_item']['size'] : $attr['hero_slider_item'];
			$attr['number_post'] = $attr['number_post'] * $hero_slider_item;
		}

		$results = $this->build_query( $attr );
		return $this->render_output( $results['result'], $attr, $column_class );
	}

	/**
	 * Method render_element
	 *
	 * @param array $result result.
	 *
	 * @return string
	 */
	abstract public function render_element( $result );
}
