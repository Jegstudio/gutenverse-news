<?php
/**
 * Module 18
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

use GUTENVERSE\NEWS\Util\Image\Image_Normal_Load;


/**
 * Module_18
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_18 extends Module_View_Abstract {

	/**
	 * This variable for consume block style
	 *
	 * @var string
	 */
	public $main_thumbnail_class = 'gvnews_pl_lg_8';

	/**
	 * Attribute
	 *
	 * @var mixed
	 */
	protected $attribute;

	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$post_id   = $post->ID;
		$permalink = esc_url( get_the_permalink( $post ) );

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_8', $post_id ) . ">
					<div class=\"gvnews_postblock_heading\">
						<h3 class=\"gvnews_post_title\">
							<a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . '</a>
						</h3>
					</div>
					<div class="gvnews_postblock_content">
						<div class="gvnews_thumb">
							' . gvnews_edit_post( $post_id ) . "
							<a href=\"{$permalink}\" aria-label=\"" . esc_attr( get_the_title( $post ) ) . "\">{$this->get_thumbnail($post_id,$image_size)}</a>
						</div>
						" . $this->post_meta_1( $post ) . '
					</div>
				</article>';
	}

	/**
	 * Method build_column
	 *
	 * @param array   $results results.
	 * @param string  $column_class column class.
	 * @param boolean $is_ajax is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $column_class, $is_ajax ) {
		$first_block = '';
		$size        = count( $results );
		$image_size  = 'gvnews-350x250';

		add_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $is_ajax ? $this->render_block_type_1( $results[ $i ], $image_size ) : $this->render_block_type_1( $results[ $i ], $image_size );
		}
		remove_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );

		return $first_block;
	}

	/**
	 * Method render_output
	 *
	 * @param array  $attr         attribute.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_output( $attr, $column_class ) {
		$results         = isset( $attr['results'] ) ? $attr['results'] : $this->build_query( $attr );
		$navigation      = $this->render_navigation( $attr, $results['next'], $results['prev'], $results['total_page'] );
		$this->attribute = $attr;
		$content         = ! empty( $results['result'] ) ? $this->render_column( $results['result'], $column_class ) : $this->empty_content();

		return "<div class=\"gvnews_block_container\">
					{$this->get_content_before($attr)}
					{$content}
					{$this->get_content_after($attr)}
				</div>
				{$navigation}";
	}

	/**
	 * Method render_column
	 *
	 * @param array  $result       result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column( $result, $column_class ) {
		return "<div class=\"gvnews_posts gvnews_load_more_flag\">{$this->build_column($result,$column_class, false)}</div>";
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array  $result result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column_alt( $result, $column_class ) {
		return $this->build_column( $result, $column_class, true );
	}
}
