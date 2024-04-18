<?php
/**
 * Module 14
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_14
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_14 extends Module_View_Abstract {


	/**
	 * Method render_block_type
	 *
	 * @param object  $post       post.
	 * @param string  $image_size image size.
	 * @param integer $type       type.
	 *
	 * @return string
	 */
	public function render_block_type( $post, $image_size, $type = 1 ) {
		$post_id   = $post->ID;
		$permalink = esc_url( get_the_permalink( $post ) );

		$content = '<div class="gvnews_thumb">
                        ' . gvnews_edit_post( $post_id ) . "
                        <a href=\"{$permalink}\">{$this->get_thumbnail($post_id,$image_size)}</a>
                    </div>
                    <div class=\"gvnews_postblock_content\">
                        <div class=\"gvnews_post_category\">
                            <span>{$this->get_primary_category($post_id)}</span>
                        </div>
                        <h3 class=\"gvnews_post_title\">
                            <a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . '</a>
                        </h3>
                        ' . $this->post_meta_3( $post ) . '
                    </div>';

		return 1 === $type ? $content : '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_1', $post->ID ) . ">{$content}</article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array  $results results.
	 * @param string $column_class is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $column_class ) {

		$image_size = 'gvnews-750x375';
		if ( 'gvnews_col_1o3' === $column_class ) {
			$image_size = 'gvnews-360x180';
		} elseif ( 'gvnews_col_3o3' === $column_class ) {
			$image_size = 'gvnews-1140x570';
		}

		$first_block = $this->render_block_type( $results[0], $image_size, 1 );

		$second_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			$second_block .= $this->render_block_type( $results[ $i ], 'gvnews-360x180', 2 );
		}

		return '<div class="gvnews_posts_wrap">
                    <div class="gvnews_postbig">
                        <article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_box', $results[0]->ID ) . ">
                            <div class=\"box_wrap\">
                                {$first_block}
                            </div>
                        </article>
                    </div>
                    <div class=\"gvnews_posts gvnews_load_more_flag\">
                        {$second_block}
                    </div>
                </div>";
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array $results result.
	 *
	 * @return string
	 */
	public function build_column_alt( $results ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type( $results[ $i ], 'gvnews-360x180', 2 );
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
		$content    = ! empty( $results['result'] ) ? $this->render_column( $results['result'], $column_class ) : $this->empty_content();

		return "<div class=\"gvnews_block_container\">
                    {$this->get_content_before($attr)}
                    {$content}
                    {$this->get_content_after($attr)}
                </div>
                <div class=\"gvnews_block_navigation\">
                    {$this->get_navigation_before($attr)}
                    {$navigation}
                    {$this->get_navigation_after($attr)}
                </div>";
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
		return $this->build_column( $result, $column_class );
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
		return $this->build_column_alt( $result );
	}
}
