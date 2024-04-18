<?php
/**
 * User list
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS\Block;

use GUTENVERSE\NEWS\Block\Grab;

/**
 * Class Init
 *
 * @package Gutenverse-News
 */
class User_List extends Grab {


	/**
	 * Method get_content
	 *
	 * @return string
	 */
	public function get_content() {
		$users = '';
		foreach ( $this->attributes['includeUser'] as $cat ) {
			if ( '' === $users ) {
				$users = $cat['value'];
			} else {
				$users .= ',' . $cat['value'];
			}
		}
		$eusers = '';
		foreach ( $this->attributes['excludeUser'] as $cat ) {
			if ( '' === $eusers ) {
				$eusers = $cat['value'];
			} else {
				$eusers .= ',' . $cat['value'];
			}
		}
		$srole = '';
		foreach ( $this->attributes['showRole'] as $cat ) {
			if ( '' === $srole ) {
				$srole = $cat['value'];
			} else {
				$srole .= ',' . $cat['value'];
			}
		}
		$hrole = '';
		foreach ( $this->attributes['hideRole'] as $cat ) {
			if ( '' === $hrole ) {
				$hrole = $cat['value'];
			} else {
				$hrole .= ',' . $cat['value'];
			}
		}
		$attr = array(
			'short_code'          => $this->attributes['gvnewsModule'],
			'userlist_style'      => $this->attributes['listStyle'],
			'userlist_desc'       => $this->attributes['hideDescription'],
			'userlist_trunc'      => $this->attributes['truncateDescription'],
			'userlist_social'     => $this->attributes['hideSocial'],
			'userlist_align'      => $this->attributes['userAlign'],
			'number_user'         => $this->attributes['numberUser'],
			'follow_button'       => $this->attributes['showFollow'],
			'userlist_subscriber' => $this->attributes['showSubscribe'],
			'first_title'         => $this->attributes['title'],
			'second_title'        => $this->attributes['second_title'],
			'url'                 => $this->attributes['url_title'],
			'header_type'         => $this->attributes['headerType'],
			'header_icon'         => $this->attributes['icon'],
			'userlist_block1'     => $this->attributes['blockWidth'],
			'userlist_block2'     => $this->attributes['blockWidth2'],
			'userlist_block3'     => $this->attributes['blockWidth3'],
			'include_user'        => $users,
			'exclude_user'        => $users,
			'userlist_show_role'  => $srole,
			'userlist_hide_role'  => $hrole,
		);

		if ( isset( $attr['number_user']['size'] ) ) {
			$attr['number_user'] = $attr['number_user']['size'];
		}
		$args       = array(
			'role__in'     => ! empty( $attr['userlist_show_role'] ) ? explode( ',', $attr['userlist_show_role'] ) : array(),
			'role__not_in' => ! empty( $attr['userlist_hide_role'] ) ? explode( ',', $attr['userlist_hide_role'] ) : array(),
			'include'      => ! empty( $attr['include_user'] ) ? explode( ',', $attr['include_user'] ) : array(),
			'exclude'      => ! empty( $attr['exclude_user'] ) ? explode( ',', $attr['exclude_user'] ) : array(),
			'number'       => ! empty( $attr['number_user'] ) ? $attr['number_user'] : '',
		);
		$user_query = new \WP_User_Query( $args );
		$results    = $user_query->get_results();

		return $this->render_element( $results, $attr );
	}

	/**
	 * Method render_element
	 *
	 * @param array $results results.
	 * @param array $attr    attribute.
	 *
	 * @return string
	 */
	public function render_element( $results, $attr ) {

		/**
	* Variables (for readability)
*/
		$style  = $attr['userlist_style'];
		$align  = $attr['userlist_align'];
		$output = '';

		/**
	* Get user alignment
*/
		$align_css = '';
		if ( 'gvnews_user_align_left' === $align ) {
			$align_css = 'style = text-align:left';
		} elseif ( 'gvnews_user_align_right' === $align ) {
			$align_css = 'style = text-align:right';
		} else {
			$align_css = 'style = text-align:center';
		}

		/**
	* Get style option
*/
		if ( 'style-1' === $style ) {
			$block  = $attr['userlist_block1'];
			$output = $output . "<div class='gvnews_userlist style-1 " . $block . " ' " . $align_css . '>';
		} elseif ( 'style-2' === $style ) {
			$block  = $attr['userlist_block2'];
			$output = $output . "<div class='gvnews_userlist style-2 " . $block . " ' " . $align_css . '>';
		} elseif ( 'style-3' === $style ) {
			$block  = $attr['userlist_block3'];
			$output = $output . "<div class='gvnews_userlist style-3 " . $block . " ' " . $align_css . '>';
		} elseif ( 'style-4' === $style ) {
			$output = $output . "<div class='gvnews_userlist style-4 gvnews_1_block' style\"=\"text-align:left\">";
		} elseif ( 'style-5' === $style ) {
			$block  = $attr['userlist_block1'];
			$output = $output . "<div class='gvnews_userlist style-5 " . $block . " ' " . $align_css . '>';
		}

		/**
	* Render Title
*/
		$output  = $output . $this->render_header( $attr ) . '<ul>';
		$output .= $this->content( $results, $attr );
		$output .= '</ul>';
		$output  = $output . '</div>';

		return $output;
	}

	/**
	 * Method render_header
	 *
	 * @param string $attr attributes.
	 *
	 * @return string
	 */
	public function render_header( $attr ) {
		if ( defined( 'POLYLANG_VERSION' ) ) {
			$attr['first_title']        = gvnews_translate_polylang( $attr['first_title'] );
			$attr['second_title']       = gvnews_translate_polylang( $attr['second_title'] );
			$attr['header_filter_text'] = gvnews_translate_polylang( $attr['header_filter_text'] );
		}

		// Heading.
		$subtitle      = ! empty( $attr['second_title'] ) ? "<strong>{$attr['second_title']}</strong>" : '';
		$header_class  = "gvnews_block_{$attr['header_type']}";
		$heading_title = $attr['first_title'] . $subtitle;

		$output = '';

		if ( ! empty( $heading_title ) ) {
			$heading_icon  = empty( $attr['header_icon'] ) ? '' : "<i class='{$attr['header_icon']}'></i>";
			$heading_title = "<span>{$heading_icon}{$attr['first_title']}{$subtitle}</span>";
			$heading_title = ! empty( $attr['url'] ) ? "<a href='{$attr['url']}'>{$heading_title}</a>" : $heading_title;
			$heading_title = "<h3 class=\"gvnews_block_title\">{$heading_title}</h3>";

			$wrapper_classes = gvnews_build_html_classes(
				array(
					'gvnews_block_heading',
					$header_class,
					'gvnews_subcat_right',
				)
			);

			// Now Render Output.
			$output =
			"<div class=\"{$wrapper_classes}\">
                {$heading_title}
            </div>";
		}

		return $output;
	}

	/**
	 * Method content
	 *
	 * @param array $results results.
	 * @param array $attr    attributes.
	 *
	 * @return string
	 */
	public function content( $results, $attr ) {
		$content      = '';
		$style        = $attr['userlist_style'];
		$hide_desc    = $attr['userlist_desc'];
		$hide_social  = $attr['userlist_social'];
		$trunc_desc   = $attr['userlist_trunc'];
		$social_array = $this->declare_socials();
		/**
	* User List Content
*/
		foreach ( $results as $user ) {
			// ~ AVATAR
			$content = $content . "<li><div class='gvnews_userlist-wrap'><div class='gvnews_userlist-photo'><a href=\"" . get_bloginfo( 'url' ) . '/?author=' . esc_attr( $user->ID ) . '">' . get_avatar( $user->ID, 500 ) . '</a></div>';

			// ~ NAME
			$content = $content . "<div class='gvnews_userlist-content'>";
			if ( get_user_meta( $user->ID, 'first_name', true ) || get_user_meta( $user->ID, 'last_name', true ) ) {
				$name = get_user_meta( $user->ID, 'first_name', true ) . ' ' . get_user_meta( $user->ID, 'last_name', true );
			} else {
				$name = get_the_author_meta( 'display_name', $user->ID );
			}

			$user_name = '<a href="' . get_author_posts_url( $user->ID ) . "\" class='gvnews_userlist-name'>" . esc_attr( $name ) . '</a>';

			$content = $content . $user_name;
			if ( ! in_array( $style, array( 'style-4', 'style-5', true ) ) ) {

				// ~ DESCRIPTION
				if ( ! $hide_desc ) {
					$desc = get_the_author_meta( 'description', $user->ID );
					if ( $trunc_desc ) {
						$desc = strlen( $desc ) > 150 ? substr( $desc, 0, 150 ) . '...' : $desc;
					}

					$content = $content . "<span class='gvnews_userlist-desc'>" . esc_html( $desc ) . '</span>';
				}

				// ~ SOCIALS
				$socials = $this->check_socials( $user->ID, $social_array );
				if ( ! $hide_social && ! empty( $socials ) ) {
					$content = $content . "<div class='gvnews_userlist-socials'>" . $socials . '</div>';
				}
			}
			$content = $content . '</div>';

			// ~ CLOSING LIST TAGS
			$content = $content . '</div></li>';
		}

		return $content;
	}


	/**
	 * Method declare_socials
	 *
	 * @return array
	 */
	public function declare_socials() {
		return array(
			'url' => 'fa-globe',
		);
	}


	/**
	 * Method check_socials
	 *
	 * @param array  $user user.
	 * @param string $social_array socials.
	 *
	 * @return string
	 */
	public function check_socials( $user, $social_array ) {
		$socials = '';

		foreach ( $social_array as $key => $value ) {
			if ( get_the_author_meta( $key, $user ) ) {
				$socials = $socials . "<a target='_blank' href='" . get_the_author_meta( $key, $user ) . "' class='" . esc_attr( $key ) . "'><i class='fa " . esc_attr( $value ) . "'></i> </a>";
			}
		}

		return $socials;
	}
}
