<?php
/**
 * Module 31
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_31
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_31 extends Module_View_Abstract {

	/**
	 * Method render_block
	 *
	 * @param object $post post.
	 * @param array  $attr attribute.
	 *
	 * @return string
	 */
	public function render_block( $post, $attr ) {
		$post_id = $post->ID;
		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_sm_2', $post_id ) . ">
                    <div class=\"gvnews_postblock_content\">
                        <div class=\"gvnews_post_category\">
                            {$this->get_primary_category($post_id)}
                        </div>
                        <h3 class=\"gvnews_post_title\">
                            <a href=\"" . esc_url( get_the_permalink( $post ) ) . '">' . esc_attr( get_the_title( $post ) ) . "</a>
                        </h3>
                        {$this->post_meta_2($post)}
                    </div>
                </article>";
	}

	/**
	 * Method build_column
	 *
	 * @param array $results results.
	 * @param array $attr is ajax.
	 *
	 * @return string
	 */
	public function build_column( $results, $attr ) {
		$output = '';
		$size   = count( $results );

		for ( $i = 0; $i < $size; $i++ ) {
			$output .= $this->render_block( $results[ $i ], $attr );
		}

		return $output;
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
	 * @param string $attr column class.
	 *
	 * @return string
	 */
	public function render_column( $result, $attr ) {
		return "<div class=\"gvnews_posts gvnews_load_more_flag \">
                    {$this->build_column($result,$attr)}
                </div>";
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array  $result result.
	 * @param string $attr column class.
	 *
	 * @return string
	 */
	public function render_column_alt( $result, $attr ) {
		return $this->build_column( $result, $attr );
	}
}
