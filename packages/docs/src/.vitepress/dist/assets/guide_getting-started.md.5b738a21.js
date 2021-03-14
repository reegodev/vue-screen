import{o as n,c as s,d as a}from"./app.89f185b4.js";const t='{"title":"Getting Started","description":"","frontmatter":{"editLink":true},"headers":[{"level":2,"title":"Installation","slug":"installation"},{"level":2,"title":"Composition API","slug":"composition-api"},{"level":2,"title":"Plugin","slug":"plugin"}],"relativePath":"guide/getting-started.md","lastUpdated":1615748265325}',p={},e=a('<h1 id="getting-started"><a class="header-anchor" href="#getting-started" aria-hidden="true">#</a> Getting Started</h1><h2 id="installation"><a class="header-anchor" href="#installation" aria-hidden="true">#</a> Installation</h2><div class="language-bash"><pre><code><span class="token function">yarn</span> <span class="token function">add</span> vue-screen@next\n</code></pre></div><div class="language-bash"><pre><code><span class="token function">npm</span> i vue-screen@next\n</code></pre></div><p>The library can be used in two ways: with Composition API or as a global plugin.</p><h2 id="composition-api"><a class="header-anchor" href="#composition-api" aria-hidden="true">#</a> Composition API</h2><p>This is the recommended way if you only use Composition API.<br></p><p>The library exposes two composables:</p><ul><li><code>useScreen</code>: returns an object containing information about the screen size, resolution, device orientation, etc.<br><a href="/api/screen.html">View all properties of the screen object</a><br><br></li><li><code>useGrid</code>: returns an object containing information about the breakpoints state of your chosen UI framework<br> <a href="/api/grid.html">View all properties of the grid object</a></li></ul><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>script</span><span class="token punctuation">&gt;</span></span><span class="token script"><span class="token language-javascript">\n<span class="token keyword">import</span> <span class="token punctuation">{</span> useScreen<span class="token punctuation">,</span> useGrid <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue-screen&#39;</span>\n<span class="token keyword">export</span> <span class="token keyword">default</span> <span class="token punctuation">{</span>\n  <span class="token function">setup</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> width<span class="token punctuation">,</span> height <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useScreen</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n    <span class="token keyword">const</span> <span class="token punctuation">{</span> breakpoint <span class="token punctuation">}</span> <span class="token operator">=</span> <span class="token function">useGrid</span><span class="token punctuation">(</span><span class="token string">&#39;tailwind&#39;</span><span class="token punctuation">)</span>\n\n    <span class="token keyword">return</span> <span class="token punctuation">{</span>\n      width<span class="token punctuation">,</span>\n      height<span class="token punctuation">,</span>\n      breakpoint<span class="token punctuation">,</span>\n    <span class="token punctuation">}</span>\n  <span class="token punctuation">}</span>\n<span class="token punctuation">}</span>\n</span></span><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>script</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Screen width is {{ width }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Screen height is {{ height }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Current breakpoint is {{ breakpoint }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div><p>If you need to share the same config between multiple components, check out <a href="/guide/examples/shared-config.html">this example</a>.</p><br><div class="tip custom-block"><p class="custom-block-title">TIP</p><p>This is also the most efficient method as you can tree shake away one of the two composable functions if you dont use them.</p></div><br><h2 id="plugin"><a class="header-anchor" href="#plugin" aria-hidden="true">#</a> Plugin</h2><p>This is the recommended way if you plan to use Options API.</p><div class="language-js"><pre><code><span class="token keyword">import</span> <span class="token punctuation">{</span> createApp <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">&#39;vue&#39;</span>\n<span class="token keyword">import</span> VueScreen <span class="token keyword">from</span> <span class="token string">&#39;vue-screen&#39;</span>\n\n<span class="token function">createApp</span><span class="token punctuation">(</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span>VueScreen<span class="token punctuation">,</span> <span class="token string">&#39;tailwind&#39;</span><span class="token punctuation">)</span>\n  <span class="token punctuation">.</span><span class="token function">mount</span><span class="token punctuation">(</span><span class="token string">&#39;#app&#39;</span><span class="token punctuation">)</span>\n</code></pre></div><p>After installing the plugin, 2 global properties will be injected in every component:</p><ul><li><code>$screen</code>: contains information about the screen size, resolution, etc.</li><li><code>$grid</code>: contains information about the breakpoints of your selected UI framework.</li></ul><div class="language-vue"><pre><code><span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>template</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>div</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Screen width is {{ $screen.width }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Screen height is {{ $screen.height }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n    <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>p</span><span class="token punctuation">&gt;</span></span>Current breakpoint is {{ $grid.breakpoint }}<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>p</span><span class="token punctuation">&gt;</span></span>\n  <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>div</span><span class="token punctuation">&gt;</span></span>\n<span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>template</span><span class="token punctuation">&gt;</span></span>\n</code></pre></div>',20);p.render=function(a,t,p,o,c,i){return n(),s("div",null,[e])};export default p;export{t as __pageData};
