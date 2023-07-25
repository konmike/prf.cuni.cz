<?php

namespace Drupal\fsv_megamenu\Plugin\Block;


use Drupal\Core\Annotation\Translation;
use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Entity\EntityStorageInterface;
use Drupal\Core\Entity\EntityViewBuilderInterface;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Menu\MenuLinkInterface;
use Drupal\Core\Menu\MenuLinkTree;
use Drupal\Core\Menu\MenuLinkTreeElement;
use Drupal\node\NodeStorage;
use Drupal\node\NodeStorageInterface;
use Drupal\node\NodeViewBuilder;

/**
 * Class MegamenuBlock
 *
 * Provides the Megamenu block
 * @Block(
 *     id = "fsv_megamenu_block",
 *     admin_label = @Translation("Megamenu block")
 * )
 * @package Drupal\fsv_megamenu\Plugin\Block
 */
class MegamenuBlock extends BlockBase implements BlockPluginInterface
{

    /**
     * Builds and returns the renderable array for this block plugin.
     *
     * If a block should not be rendered because it has no content, then this
     * method must also ensure to return no content: it must then only return an
     * empty array, or an empty array with #cache set (with cacheability metadata
     * indicating the circumstances for it being empty).
     *
     * @return array
     *   A renderable array representing the content of the block.
     *
     * @see \Drupal\block\BlockViewBuilder
     */

    /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);

    $config = $this->getConfiguration();

    $form['fsv_megamenu_block_menu_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('What menu you want to use on this template?'),
      '#description' => $this->t('Write a exact id of the existing menu of your choose'),
      '#default_value' => isset($config['fsv_megamenu_block_menu_id']) ? $config['fsv_megamenu_block_menu_id'] : 'main',
    ];

    return $form;
     

  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    $values = $form_state->getValues();
    $this->configuration['fsv_megamenu_block_menu_id'] = $values['fsv_megamenu_block_menu_id'];
    $menuid = $this->configuration['fsv_megamenu_block_menu_id'];
  }

    public function build()
    {
      
        $config = $this->getConfiguration();
        $menuid = $config['fsv_megamenu_block_menu_id'];

        $links = array();
        $nodeStorage = \Drupal::entityTypeManager()->getStorage('node');
        $nodeViewBuilder = \Drupal::entityTypeManager()->getViewBuilder('node');
        $menuTreeService = \Drupal::service('menu.link_tree');
        
        $tree = $this->getMenuTree($menuTreeService, $menuid);

        foreach ($tree as $item) {
            /** @var \Drupal\Core\Menu\MenuLinkInterface $link */
            $link = $item->link;

            $links[] = [
                'below' => $this->buildBelowLinks($item, $menuTreeService),
                'top_level_link' => $this->buildTopLevelLink($item, $menuTreeService),
                'node' => $this->loadNodeFromMenu($link, $nodeStorage, $nodeViewBuilder)
            ];
        }
        
        // $language = \Drupal::languageManager()->getCurrentLanguage()->getId();
        $mostVisitedMenu = $this->getMenuTree($menuTreeService, 'most-visited-cs');
        $language = \Drupal::languageManager()->getCurrentLanguage();

        return array(
            '#theme' => 'fsv_megamenu_block',
            '#links' => $links,
            '#most_visited' => $menuTreeService->build($mostVisitedMenu),
            '#cache' => array(
                'contexts' => ['languages'],
                'tags' => ['node_list']
            ),
        );
    }
    
    private function buildTopLevelLink(MenuLinkTreeElement $item, MenuLinkTree $menuTreeService) {
        $item->hasChildren = false;
        $item->subtree = [];

        $item = $menuTreeService->build([$item]);
        return \array_values($item['#items'])[0];
    }
    
    private function buildBelowLinks(MenuLinkTreeElement $item, MenuLinkTree $menuTreeService) {
        $theme = [];
        if ($item->hasChildren && !empty($item->subtree)) {
            $theme = $menuTreeService->build($item->subtree);
            $theme['#theme'] = "fsv_megamenu_links";
        }
        return $theme;
    }

    private function getMenuTree(MenuLinkTree $menuTreeService, $menuName) {
        $parameters = new \Drupal\Core\Menu\MenuTreeParameters();
        $parameters
            ->setMaxDepth(3)
            ->onlyEnabledLinks()
            ->excludeRoot();
        $tree = $menuTreeService->load($menuName, $parameters);

        // Get the tree.
        // Apply some manipulators (checking the access, sorting).
        $manipulators = [
            ['callable' => 'menu.default_tree_manipulators:checkNodeAccess'],
            ['callable' => 'menu.default_tree_manipulators:checkAccess'],
            ['callable' => 'menu.default_tree_manipulators:generateIndexAndSort'],
        ];
        return $menuTreeService->transform($tree, $manipulators);
    }
    
    private function loadNodeFromMenu(MenuLinkInterface $link, EntityStorageInterface $nodeStorage, EntityViewBuilderInterface $nodeViewBuilder) {
        if ($link->getRouteName() == 'entity.node.canonical') {
            $parameters = $link->getRouteParameters();
            $node_id = $parameters['node'];
            $node = $nodeStorage->load($node_id);
            return $nodeViewBuilder->view($node, 'teaser');
        } else {
            return null;
        }
    }
}