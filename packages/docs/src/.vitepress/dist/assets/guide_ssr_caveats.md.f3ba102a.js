import{o as a,c as e,d as s}from"./app.ae8eaa2d.js";const n='{"title":"SSR caveats","description":"","frontmatter":{"editLink":true},"headers":[{"level":2,"title":"Hydration errors","slug":"hydration-errors"}],"relativePath":"guide/ssr/caveats.md","lastUpdated":1615763376878}',t={},o=s('<h1 id="ssr-caveats"><a class="header-anchor" href="#ssr-caveats" aria-hidden="true">#</a> SSR caveats</h1><p>Unfortunately, when server-side rendering there is no information about the the screen size of the user who is requesting the page, so this library uses a configuration to decide the screen size on the server.<br> This behaviour can lead to some issues.</p><h2 id="hydration-errors"><a class="header-anchor" href="#hydration-errors" aria-hidden="true">#</a> Hydration errors</h2><p>You can step into hydration errors if you conditionally render DOM elements or components based on screen or grid properties, because they can be different between the server and the client.</p><p>For example, if you create a the following template:</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name">v-if</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$grid.lg<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>And open the app with a screen at 1400x900, you will receive hydration errors because the server rendered the template when <code>$grid.lg</code> was false, while in the browser the same property is true.</p><p>To avoid these problems, use <code>v-show</code> instead of <code>v-if</code> whenever possible.</p><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>MyComponent</span> <span class="token attr-name">v-show</span><span class="token attr-value"><span class="token punctuation attr-equals">=</span><span class="token punctuation">&quot;</span>$grid.lg<span class="token punctuation">&quot;</span></span> <span class="token punctuation">/&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>Since <code>v-show</code> keeps the element in the DOM, Vue will be able to match the DOM and vDOM correctly.</p>',10);t.render=function(s,n,t,p,r,c){return a(),e("div",null,[o])};export default t;export{n as __pageData};