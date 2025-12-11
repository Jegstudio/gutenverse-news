<?php
/**
 * Social Contacts
 *
 * @author  Jegstudio
 * @since   1.0.0
 * @package gutenverse-news
 */

namespace GUTENVERSE\NEWS;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Social Contacts
 *
 * @author  Jegstudio
 */
class Social_Contacts {

	/**
	 * Add additional admin contact
	 *
	 * @return array
	 */
	public static function gvnews_admin_contact() {
		return array(
			'facebook'   => __( 'Facebook', 'gutenverse-news' ),
			'tiktok'     => __( 'Tiktok', 'gutenverse-news' ),
			'twitter'    => __( 'Twitter', 'gutenverse-news' ),
			'linkedin'   => __( 'Linkedin', 'gutenverse-news' ),
			'pinterest'  => __( 'Pinterest', 'gutenverse-news' ),
			'behance'    => __( 'Behance', 'gutenverse-news' ),
			'github'     => __( 'Github', 'gutenverse-news' ),
			'flickr'     => __( 'Flickr', 'gutenverse-news' ),
			'tumblr'     => __( 'Tumblr', 'gutenverse-news' ),
			'dribbble'   => __( 'Dribbble', 'gutenverse-news' ),
			'soundcloud' => __( 'Soundcloud', 'gutenverse-news' ),
			'instagram'  => __( 'Instagram', 'gutenverse-news' ),
			'vimeo'      => __( 'Vimeo', 'gutenverse-news' ),
			'youtube'    => __( 'Youtube', 'gutenverse-news' ),
			'reddit'     => __( 'Reddit', 'gutenverse-news' ),
			'vk'         => __( 'Vk', 'gutenverse-news' ),
			'weibo'      => __( 'Weibo', 'gutenverse-news' ),
			'twitch'     => __( 'Twitch', 'gutenverse-news' ),
			'rss'        => __( 'Rss', 'gutenverse-news' ),
			'threads'    => __( 'Threads', 'gutenverse-news' ),
			'xing'       => __( 'Xing', 'gutenverse-news' ),
		);
	}

	/**
	 * Social media array.
	 *
	 * @return array
	 */
	public static function social_icon_list_class() {
		return array(
			'url'        => 'fa fa-globe',
			'facebook'   => 'fab fa-facebook',
			'twitter'    => 'fab fa-twitter',
			'linkedin'   => 'fab fa-linkedin',
			'pinterest'  => 'fab fa-pinterest',
			'behance'    => 'fab fa-behance',
			'github'     => 'fab fa-github',
			'flickr'     => 'fab fa-flickr',
			'tumblr'     => 'fab fa-tumblr',
			'dribbble'   => 'fab fa-dribbble',
			'soundcloud' => 'fab fa-soundcloud',
			'instagram'  => 'fab fa-instagram',
			'vimeo'      => 'fab fa-vimeo',
			'youtube'    => 'fab fa-youtube',
			'vk'         => 'fab fa-vk',
			'reddit'     => 'fab fa-reddit',
			'weibo'      => 'fab fa-weibo',
			'rss'        => 'fa fa-rss',
			'twitch'     => 'fab fa-twitch',
			'tiktok'     => 'fa-brands fa-tiktok',
			'threads'    => 'fa-brands fa-threads',
			'xing'       => 'fab fa-xing',
		);
	}
}
