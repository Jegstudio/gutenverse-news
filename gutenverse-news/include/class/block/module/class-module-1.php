<?php
/**
 * Module 1
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block\Module;

/**
 * Module_1
 *
 * @package gutenverse-news
 * @author Jegstudio
 */
class Module_1 extends Module_View_Abstract {


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

		return '<div class="gvnews_thumb">
					' . gvnews_edit_post( $post_id ) . "
					<a href=\"{$permalink}\">{$this->get_thumbnail($post_id,$image_size)}</a>
					<div class=\"gvnews_post_category\">
						<span>{$this->get_primary_category($post_id)}</span>
					</div>
				</div>
				<div class=\"gvnews_postblock_content\">
					<h3 property=\"headline\" class=\"gvnews_post_title\">
						<a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
					</h3>
					{$this->post_meta_1($post)}
					<div class=\"gvnews_post_excerpt\">
						<p>" . esc_attr( $this->get_excerpt( $post ) ) . "</p>
						<a href=\"{$permalink}\" class=\"gvnews_readmore\">" . esc_html__( 'Read more', 'gutenverse-news' ) . '</a>
					</div>
				</div>';
	}

	/**
	 * Method render_block_type_2
	 *
	 * @param object $post       post.
	 * @param string $image_size image size.
	 *
	 * @return string
	 */
	public function render_block_type_2( $post, $image_size ) {
		$post_id          = $post->ID;
		$permalink        = esc_url( get_the_permalink( $post ) );
		$additional_class = ( ! has_post_thumbnail( $post_id ) ) ? ' no_thumbnail' : '';

		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_sm' . $additional_class, $post_id ) . '>
					<div class="gvnews_thumb">
						' . gvnews_edit_post( $post_id ) . "
						<a href=\"{$permalink}\">
							{$this->get_thumbnail($post_id,$image_size)}
						</a>
					</div>
					<div class=\"gvnews_postblock_content\">
						<h3 class=\"gvnews_post_title\">
							<a href=\"{$permalink}\">" . esc_attr( get_the_title( $post ) ) . "</a>
						</h3>
						{$this->post_meta_2($post)}
					</div>
				</article>";
	}

	/**
	 * Method render_block_type_3
	 *
	 * @param object $post post.
	 *
	 * @return string
	 */
	public function render_block_type_3( $post ) {
		return '<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_xs_2', $post->ID ) . '>
					<i class="fas fa-caret-right"></i>
					<div class="gvnews_postblock_content">
						<h3 class="gvnews_post_title"><a href="' . get_permalink( $post ) . '">' . esc_attr( get_the_title( $post ) ) . "</a></h3>
						{$this->post_meta_2($post)}
					</div>
				</article>";
	}

	/**
	 * Method build_column_1
	 *
	 * @param object $results results.
	 *
	 * @return string
	 */
	public function build_column_1( $results ) {
		$first_block = $this->render_block_type_1( $results[0], 'gvnews-360x180' );

		$second_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			$second_block .= $this->render_block_type_2( $results[ $i ], 'gvnews-120x86' );
		}

		return '<div class="gvnews_posts">
					<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_1', $results[0]->ID ) . ">
						$first_block
					</article>
					<div class=\"gvnews_postsmall\">
						$second_block
					</div>
				</div>";
	}

	/**
	 * Method build_column_1_alt
	 *
	 * @param array $results results.
	 *
	 * @return string
	 */
	public function build_column_1_alt( $results ) {
		$first_block = '';
		$size        = count( $results );
		for ( $i = 0; $i < $size; $i++ ) {
			$first_block .= $this->render_block_type_2( $results[ $i ], 'gvnews-120x86' );
		}

		return "<div class=\"gvnews_posts\">
					<div class=\"gvnews_postsmall\">
						$first_block
					</div>
				</div>";
	}

	/**
	 * Method build_column_2
	 *
	 * @param arary $results results.
	 *
	 * @return string
	 */
	public function build_column_2( $results ) {
		$first_block = $this->render_block_type_1( $results[0], 'gvnews-360x180' );

		$second_block = '';
		$size         = count( $results );
		for ( $i = 1; $i < $size; $i++ ) {
			$second_block .= $this->render_block_type_2( $results[ $i ], 'gvnews-120x86' );
		}

		return '<div class="gvnews_posts gvnews-posts-row">
					<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_1 col-sm-6', $results[0]->ID ) . ">
						$first_block
					</article>
					<div class=\"gvnews_postsmall col-sm-6\">
						$second_block
					</div>
				</div>";
	}

	/**
	 * Method build_column_3
	 *
	 * @param arary $results results.
	 *
	 * @return string
	 */
	public function build_column_3( $results ) {
		$first_block = $this->render_block_type_1( $results[0], 'gvnews-360x180' );

		$size        = count( $results );
		$first_limit = (int) ceil( ( $size - 1 ) * 2 / 5 ) + 1;

		$second_block = '';
		for ( $i = 1; $i < $first_limit; $i++ ) {
			$second_block .= $this->render_block_type_2( $results[ $i ], 'gvnews-120x86' );
		}

		$third_block = '';
		for ( $i = $first_limit; $i < $size; $i++ ) {
			$third_block .= $this->render_block_type_3( $results[ $i ] );
		}

		return '<div class="gvnews_posts gvnews-posts-row">
					<article ' . gvnews_post_class( 'gvnews_post gvnews_pl_lg_1 col-sm-4', $results[0]->ID ) . ">
						$first_block
					</article>
					<div class=\"gvnews_postsmall col-sm-4\">
						$second_block
					</div>
					<div class=\"gvnews_postsmall col-sm-4\">
						$third_block
					</div>
				</div>";
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

		return "<div class=\"gvnews_block_container gvnews_load_more_flag\">
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
		if ( 'gvnews_col_1o3' === $column_class ) {
			return $this->build_column_1( $result );
		} elseif ( 'gvnews_col_3o3' === $column_class ) {
			return $this->build_column_3( $result );
		}

		return $this->build_column_2( $result );
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
		if ( 'gvnews_col_1o3' === $column_class ) {
			return $this->build_column_1_alt( $result );
		} elseif ( 'gvnews_col_3o3' === $column_class ) {
			return $this->build_column_3( $result );
		}

		return $this->build_column_2( $result );
	}
}
