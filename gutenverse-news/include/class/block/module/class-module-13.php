<?php
/**
 * Module 13
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_13
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_13 extends Module_View_Abstract {


	/**
	 * Method render_block
	 *
	 * @param object  $post       post.
	 * @param string  $image_size image size.
	 * @param integer $type       type.
	 *
	 * @return string
	 */
	public function render_block( $post, $image_size, $type = 1 ) {
		$permalink = esc_url( get_the_permalink( $post ) );

		$output =
		'<div class="gvnews_thumb">
                ' . gvnews_edit_post( $post->ID ) . '
                <a href="' . $permalink . '">' . $this->get_thumbnail( $post->ID, $image_size ) . "</a>
                <div class=\"gvnews_post_category\">
                    <span>{$this->get_primary_category($post->ID)}</span>
                </div>
            </div>
            <div class=\"gvnews_postblock_content\">
                <h3 class=\"gvnews_post_title\">
                    <a href=\"" . $permalink . '">' . esc_attr( get_the_title( $post ) ) . '</a>
                </h3>
                ' . $this->post_meta_1( $post ) . '
                <div class="gvnews_post_excerpt">
                    <p>' . esc_attr( $this->get_excerpt( $post ) ) . '</p>
                    <a href="' . $permalink . '" class="gvnews_readmore">' . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>
                </div>
            </div>';

		return 1 === $type ? $output :
		'<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_md_1', $post->ID ) . '>' .
		$output
		. '</article>';
	}


	/**
	 * Method build_column_1
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column_1( $results ) {
		$first_block = $this->render_block( $results[0], 'gvnews-350x250', 1 );

		$second_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			$second_block .= $this->render_block( $results[ $i ], 'gvnews-120x86', 2 );
		}

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_1', $results[0]->ID ) . ">
                    {$first_block}
                </article>
                <div class=\"gvnews_posts_wrap\">
                    <div class=\"gvnews_posts gvnews_load_more_flag\">
                        {$second_block}
                    </div>
                </div>";
	}

	/**
	 * Method build_column_2
	 *
	 * @param array $results result.
	 *
	 * @return string
	 */
	public function build_column_2( $results ) {
		$first_block = $this->render_block( $results[0], 'gvnews-360x504', 1 );

		$second_block = '';
		$third_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			if ( $i <= 2 ) {
				$second_block .= $this->render_block( $results[ $i ], 'gvnews-350x250', 2 );
			} else {
				$third_block .= $this->render_block( $results[ $i ], 'gvnews-350x250', 2 );
			}
		}

		return '<div class="gvnews_posts gvnews-posts-row">
                    <article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_1 col-sm-6', $results[0]->ID ) . ">
                        {$first_block}
                    </article>
                    <div class=\"gvnews_postsmall col-sm-6\">
                        {$second_block}
                    </div>
                </div>
                <div class=\"gvnews_posts_wrap\">
                    <div class=\"gvnews_posts gvnews_load_more_flag\">
                        {$third_block}
                    </div>
                </div>";
	}

	/**
	 * Method build_column_3
	 *
	 * @param array $results result.
	 *
	 * @return string
	 */
	public function build_column_3( $results ) {
		$first_block = $this->render_block( $results[0], 'gvnews-360x504', 1 );

		$second_block = '';
		$third_block = '';
		$fourth_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			if ( $i <= 2 ) {
				$second_block .= $this->render_block( $results[ $i ], 'gvnews-350x250', 2 );
			} elseif ( $i <= 4 ) {
				$third_block .= $this->render_block( $results[ $i ], 'gvnews-350x250', 2 );
			} else {
				$fourth_block .= $this->render_block( $results[ $i ], 'gvnews-350x250', 2 );
			}
		}

		return '<div class="gvnews_posts gvnews-posts-row">
                <article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_1 col-sm-4', $results[0]->ID ) . ">
                    {$first_block}
                </article>
                <div class=\"gvnews_postsmall col-sm-4\">
                    {$second_block}
                </div>
                <div class=\"gvnews_postsmall col-sm-4\">
                    {$third_block}
                </div>
            </div>
            <div class=\"gvnews_posts_wrap\">
                <div class=\"gvnews_posts gvnews_load_more_flag\">
                    {$fourth_block}
                </div>
            </div>";
	}

	/**
	 * Method build_column_alt
	 *
	 * @param array   $results results.
	 * @param integer $type    type.
	 *
	 * @return string
	 */
	public function build_column_alt( $results, $type = 1 ) {
		$image_size = 1 === $type ? 'gvnews-120x86' : 'gvnews-350x250';

		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block( $results[ $i ], $image_size, 2 );
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
		if ( isset( $attr['results'] ) ) {
			$results = $attr['results'];
		} else {
			$results = $this->build_query( $attr );
		}

		$navigation = $this->render_navigation( $attr, $results['next'], $results['prev'], $results['total_page'] );

		if ( ! empty( $results['result'] ) ) {
			$content = $this->render_column( $results['result'], $column_class );
		} else {
			$content = $this->empty_content();
		}

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
		switch ( $column_class ) {
			case 'gvnews_col_1o3':
				$content = $this->build_column_1( $result );
				break;
			case 'gvnews_col_3o3':
				$content = $this->build_column_3( $result );
				break;
			case 'gvnews_col_2o3':
			default:
				$content = $this->build_column_2( $result );
				break;
		}

		return $content;
	}

	/**
	 * Method render_column_alt
	 *
	 * @param array $result       result.
	 * @param array $column_class column class.
	 *
	 * @return string
	 */
	public function render_column_alt( $result, $column_class ) {
		$type = 'gvnews_col_1o3' === $column_class ? 1 : 2;
		return $this->build_column_alt( $result, $type );
	}
}
