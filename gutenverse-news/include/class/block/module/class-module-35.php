<?php
/**
 * Module 35
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_35
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_35 extends Module_View_Abstract {

	/**
	 * This variable for consume block style
	 *
	 * @var string
	 */
	public $main_thumbnail_class = 'gvnews_pl_md_5';

	/**
	 * Construct
	 */
	public function __construct() {
		add_filter( 'gvnews_custom_module_column_class', array( $this, 'custom_module_column_class' ) );
		parent::__construct();
	}
	/**
	 * Method render_block_type_1
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_1( $post, $image_size ) {
		$post_id          = $post->ID;
		$thumbnail        = \GUTENVERSE\NEWS\Util\Image\Image_Normal_Load::get_instance()->image_thumbnail( $post_id, $image_size );
		$box_shadow_flag  = isset( $this->attribute['box_shadow'] ) && $this->attribute['box_shadow'] ? 'box_shadow' : '';
		$additional_class = ( ! has_post_thumbnail( $post_id ) ) ? ' no_thumbnail' : '';
		$permalink        = esc_url( get_the_permalink( $post ) );

		$pl              = ' gvnews_pl_md_box ';
		$class           = $box_shadow_flag;
		$postformat_icon = null;
		$edit_position   = null;
		$read_more       = $this->attribute['disable_readmore'] ? '' : "<a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>';
		if ( $this->is_thumbnail_landscape( $post_id ) ) {
			$pl              = ' gvnews_pl_md_5 ';
			$class           = $additional_class;
			$postformat_icon = '<span class=\"gvnews_postformat_icon\"></span>';
			$edit_position   = 'right';
		}

		return '<article ' . gvnews_post_class( 'gvnews_post' . $pl . $class, $post_id ) . ">
                <div class=\"box_wrap\">
                    {$postformat_icon}
                    <div class=\"gvnews_thumb\">
                        " . gvnews_edit_post( $post_id, $edit_position ) . "
                        <a href=\"{$permalink}\">" . $thumbnail . "</a>
                        <div class=\"gvnews_post_category\">
                            <span>{$this->get_primary_category($post_id)}</span>
                        </div>
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <h3 class=\"gvnews_post_title\">
                            <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . '</a>
                        </h3>
                        <div class="gvnews_post_excerpt">
                            <p>' . esc_attr( $this->get_excerpt( $post ) ) . "</p>
                            {$read_more}
                        </div>
                    </div>
                    {$this->post_meta_1($post)}
                </div>
            </article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column( $results ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_1( $results[ $i ], 'gvnews-350x350' );
		}

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
		$results    = isset( $attr['results'] ) ? $attr['results'] : $this->build_query( $attr );
		$navigation = $this->render_navigation( $attr, $results['next'], $results['prev'], $results['total_page'] );

		add_filter( 'gvnews_custom_thumbnail_class', array( $this, 'thumbnail_container_class_default' ) );
		add_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
		$content = ! empty( $results['result'] ) ? $this->render_column( $results['result'], $column_class ) : $this->empty_content();
		remove_filter( 'gvnews_use_custom_image', array( $this, 'main_custom_image_size' ) );
		remove_filter( 'gvnews_custom_thumbnail_class', array( $this, 'thumbnail_container_class_default' ) );

		return "<div class=\"gvnews_block_container\">
                    {$this->get_content_before($attr)}
                    {$content}
                    {$this->get_content_after($attr)}
                </div>
                {$navigation}";
	}

	/**
	 * Method render_column.
	 *
	 * @param array  $result       result.
	 * @param string $column_class column class.
	 *
	 * @return string
	 */
	public function render_column( $result, $column_class ) {
		return "<div class=\"gvnews_posts_wrap gvnews_posts_masonry\">
                    <div class=\"gvnews_posts gvnews_load_more_flag\">
                        {$this->build_column($result)}
                    </div>
                </div>";
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
		return $this->build_column( $result );
	}

	/**
	 * Method is_thumbnail_landscape
	 *
	 * @param string $id id.
	 *
	 * @return boolean
	 */
	public function is_thumbnail_landscape( $id ) {
		$thumb_id   = get_post_thumbnail_id( $id );
		$thumb_data = wp_get_attachment_image_src( $thumb_id, 'full' );
		return ( ( isset( $thumb_data[1] ) && isset( $thumb_data[2] ) ) && ( $thumb_data[1] < $thumb_data[2] ) ) ? false : true;
	}

	/**
	 * Method custom_module_column_class
	 *
	 * @param string $column_class column class.
	 * @return string
	 */
	public function custom_module_column_class( $column_class ) {
		if ( 'auto' === $this->attribute['column_width'] ) {
			$column_class = 'gvnews_col_3o3';
		}
		return $column_class;
	}
}
