import{s as D,I as x,e as P,i as b,d as k,y as B,u as re,v as ae,w as ne,x as oe,a as R,c as M,J as ee,C as N,p as se,F as le,z as L}from"../chunks/scheduler.lc6pDmfW.js";import{S as T,i as y,a as $,g as I,t as p,c as O,b as h,d,m as v,e as w,f as fe}from"../chunks/index._UJvAQqJ.js";import{u as te,S as U,a as ie,c as ue,H as ce,T as S,O as me,D as F,C as $e}from"../chunks/vertex.ocSICPKy.js";import{e as A}from"../chunks/Pane.xoQjdWIQ.js";import{d as pe}from"../chunks/index.k8f3s86m.js";import{T as _e}from"../chunks/Text.J06egCXG.js";import{g as G}from"../chunks/mathUtils.EQ8fdnX8.js";import{d as ge,f as he,s as de}from"../chunks/store.6RS7_RVs.js";import{r as ve,P as C}from"../chunks/store.tFljVPwL.js";import{R as we,c as Se}from"../chunks/Renderer.qhxBpbZh.js";import{P as be}from"../chunks/PeerClient.lrRCa14a.js";function ke(o,r,n){let e;const{renderer:a,camera:t,scene:i}=te();let{size:f=25}=r,{focus:u=0}=r,{samples:g=10}=r;const l=U.shadowmap_pars_fragment,c=()=>{U.shadowmap_pars_fragment=l.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP
`+e).replace("#if defined( SHADOWMAP_TYPE_PCF )",`
return PCSS(shadowMap, shadowCoord);
#if defined( SHADOWMAP_TYPE_PCF )`),_()},_=()=>{i.traverse(s=>{const m=s;m.material&&(a?.properties.remove(m.material),m.material.dispose?.())}),a?.info.programs&&(a.info.programs.length=0),a?.compile(i,t.current)};return x(()=>{U.shadowmap_pars_fragment=l,_()}),o.$$set=s=>{"size"in s&&n(0,f=s.size),"focus"in s&&n(1,u=s.focus),"samples"in s&&n(2,g=s.samples)},o.$$.update=()=>{o.$$.dirty&7&&n(3,e=`
		#define PENUMBRA_FILTER_SIZE float(${f})
		#define RGB_NOISE_FUNCTION(uv) (randRGB(uv))
		vec3 randRGB(vec2 uv) {
			return vec3(
				fract(sin(dot(uv, vec2(12.75613, 38.12123))) * 13234.76575),
				fract(sin(dot(uv, vec2(19.45531, 58.46547))) * 43678.23431),
				fract(sin(dot(uv, vec2(23.67817, 78.23121))) * 93567.23423)
			);
		}

		vec3 lowPassRandRGB(vec2 uv) {
			// 3x3 convolution (average)
			// can be implemented as separable with an extra buffer for a total of 6 samples instead of 9
			vec3 result = vec3(0);
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(-1.0, +1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2( 0.0, +1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, -1.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0,  0.0));
			result += RGB_NOISE_FUNCTION(uv + vec2(+1.0, +1.0));
			result *= 0.111111111; // 1.0 / 9.0
			return result;
		}
		vec3 highPassRandRGB(vec2 uv) {
			// by subtracting the low-pass signal from the original signal, we're being left with the high-pass signal
			// hp(x) = x - lp(x)
			return RGB_NOISE_FUNCTION(uv) - lowPassRandRGB(uv) + 0.5;
		}


		vec2 vogelDiskSample(int sampleIndex, int sampleCount, float angle) {
			const float goldenAngle = 2.399963f; // radians
			float r = sqrt(float(sampleIndex) + 0.5f) / sqrt(float(sampleCount));
			float theta = float(sampleIndex) * goldenAngle + angle;
			float sine = sin(theta);
			float cosine = cos(theta);
			return vec2(cosine, sine) * r;
		}
		float penumbraSize( const in float zReceiver, const in float zBlocker ) { // Parallel plane estimation
			return (zReceiver - zBlocker) / zBlocker;
		}
		float findBlocker(sampler2D shadowMap, vec2 uv, float compare, float angle) {
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
			float blockerDepthSum = float(${u});
			float blockers = 0.0;

			int j = 0;
			vec2 offset = vec2(0.);
			float depth = 0.;

			#pragma unroll_loop_start
			for(int i = 0; i < ${g}; i ++) {
				offset = (vogelDiskSample(j, ${g}, angle) * texelSize) * 2.0 * PENUMBRA_FILTER_SIZE;
				depth = unpackRGBAToDepth( texture2D( shadowMap, uv + offset));
				if (depth < compare) {
					blockerDepthSum += depth;
					blockers++;
				}
				j++;
			}
			#pragma unroll_loop_end

			if (blockers > 0.0) {
				return blockerDepthSum / blockers;
			}
			return -1.0;
		}


		float vogelFilter(sampler2D shadowMap, vec2 uv, float zReceiver, float filterRadius, float angle) {
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);
			float shadow = 0.0f;
			int j = 0;
			vec2 vogelSample = vec2(0.0);
			vec2 offset = vec2(0.0);
			#pragma unroll_loop_start
			for (int i = 0; i < ${g}; i++) {
				vogelSample = vogelDiskSample(j, ${g}, angle) * texelSize;
				offset = vogelSample * (1.0 + filterRadius * float(${f}));
				shadow += step( zReceiver, unpackRGBAToDepth( texture2D( shadowMap, uv + offset ) ) );
				j++;
			}
			#pragma unroll_loop_end
			return shadow * 1.0 / ${g}.0;
		}

		float PCSS (sampler2D shadowMap, vec4 coords) {
			vec2 uv = coords.xy;
			float zReceiver = coords.z; // Assumed to be eye-space z in this code
			float angle = highPassRandRGB(gl_FragCoord.xy).r * PI2;
			float avgBlockerDepth = findBlocker(shadowMap, uv, zReceiver, angle);
			if (avgBlockerDepth == -1.0) {
				return 1.0;
			}
			float penumbraRatio = penumbraSize(zReceiver, avgBlockerDepth);
			return vogelFilter(shadowMap, uv, zReceiver, 1.25 * penumbraRatio, angle);
	}`),o.$$.dirty&8&&c()},[f,u,g,e]}class Re extends T{constructor(r){super(),y(this,r,ke,null,D,{size:0,focus:1,samples:2})}}const Me=()=>{const o={portals:ue(new Map),addPortal(r,n){o.portals.update(e=>(e.has(n)?console.warn(`Portal with id ${n} already exists. Skipping portal creation.`):e.set(n,r),e))},removePortal(r){o.portals.update(n=>(n.has(r)?n.delete(r):console.warn(`Portal with id ${r} does not exist. Skipping portal removal.`),n))},getPortal(r){return pe(o.portals,n=>n.get(r))},hasPortal(r){return o.portals.current.has(r)}};return o},Pe=()=>ie("threlte-portals",Me());function Z(o){let r,n;return r=new ce({props:{onChildMount:o[6],onChildDestroy:o[7],$$slots:{default:[Ne]},$$scope:{ctx:o}}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&1&&(t.onChildMount=e[6]),a&1&&(t.onChildDestroy=e[7]),a&256&&(t.$$scope={dirty:a,ctx:e}),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function Ne(o){let r;const n=o[5].default,e=re(n,o,o[8],null);return{c(){e&&e.c()},l(a){e&&e.l(a)},m(a,t){e&&e.m(a,t),r=!0},p(a,t){e&&e.p&&(!r||t&256)&&ae(e,n,a,a[8],r?oe(n,a[8],t,null):ne(a[8]),null)},i(a){r||($(e,a),r=!0)},o(a){p(e,a),r=!1},d(a){e&&e.d(a)}}}function ze(o){let r,n,e=o[0]&&Z(o);return{c(){e&&e.c(),r=P()},l(a){e&&e.l(a),r=P()},m(a,t){e&&e.m(a,t),b(a,r,t),n=!0},p(a,[t]){a[0]?e?(e.p(a,t),t&1&&$(e,1)):(e=Z(a),e.c(),$(e,1),e.m(r.parentNode,r)):e&&(I(),p(e,1,1,()=>{e=null}),O())},i(a){n||($(e),n=!0)},o(a){p(e),n=!1},d(a){a&&k(r),e&&e.d(a)}}}function Ce(o,r,n){let e,a,{$$slots:t={},$$scope:i}=r,{id:f="default"}=r,{object:u=void 0}=r;const{getPortal:g}=Pe(),l=g(f);B(o,l,s=>n(4,a=s));const c=s=>{e?.add(s)},_=s=>{e?.remove(s)};return o.$$set=s=>{"id"in s&&n(2,f=s.id),"object"in s&&n(3,u=s.object),"$$scope"in s&&n(8,i=s.$$scope)},o.$$.update=()=>{o.$$.dirty&24&&n(0,e=u??a)},[e,l,f,u,a,t,c,_,i]}class Be extends T{constructor(r){super(),y(this,r,Ce,ze,D,{id:2,object:3})}}const De=Math.PI/180;function j(o){return o*De}function Y(o,r,n){const e=o.slice();return e[9]=r[n],e}function J(o,r,n){const e=o.slice();return e[12]=r[n],e[14]=n,e}function Ie(o){let r,n;return r=new me({props:{enableZoom:o[2],enablePan:o[2],enableDamping:!0,target:[0,2.5,0]}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&4&&(t.enableZoom=e[2]),a&4&&(t.enablePan=e[2]),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function K(o){let r,n;return r=new S.DirectionalLightHelper({props:{args:[o[15]]}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&32768&&(t.args=[e[15]]),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function Oe(o){let r,n,e=o[2]&&K(o);return{c(){e&&e.c(),r=P()},l(a){e&&e.l(a),r=P()},m(a,t){e&&e.m(a,t),b(a,r,t),n=!0},p(a,t){a[2]?e?(e.p(a,t),t&4&&$(e,1)):(e=K(a),e.c(),$(e,1),e.m(r.parentNode,r)):e&&(I(),p(e,1,1,()=>{e=null}),O())},i(a){n||($(e),n=!0)},o(a){p(e),n=!1},d(a){a&&k(r),e&&e.d(a)}}}function Ge(o){let r,n;return r=new Be({props:{object:o[3],$$slots:{default:[Oe]},$$scope:{ctx:o}}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&98308&&(t.$$scope={dirty:a,ctx:e}),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function Ae(o){let r,n,e,a;return r=new S.BoxGeometry({props:{args:[.95,o[9].z*.175,.95]}}),e=new S.MeshStandardMaterial({props:{color:"#333333",roughness:.2,side:F}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment)},l(t){d(r.$$.fragment,t),n=M(t),d(e.$$.fragment,t)},m(t,i){v(r,t,i),b(t,n,i),v(e,t,i),a=!0},p:N,i(t){a||($(r.$$.fragment,t),$(e.$$.fragment,t),a=!0)},o(t){p(r.$$.fragment,t),p(e.$$.fragment,t),a=!1},d(t){t&&k(n),w(r,t),w(e,t)}}}function Te(o){let r,n,e,a;return r=new S.BoxGeometry({props:{args:[1,.375,1]}}),e=new S.MeshStandardMaterial({props:{color:"#ffffff",roughness:.2,side:F}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment)},l(t){d(r.$$.fragment,t),n=M(t),d(e.$$.fragment,t)},m(t,i){v(r,t,i),b(t,n,i),v(e,t,i),a=!0},p:N,i(t){a||($(r.$$.fragment,t),$(e.$$.fragment,t),a=!0)},o(t){p(r.$$.fragment,t),p(e.$$.fragment,t),a=!1},d(t){t&&k(n),w(r,t),w(e,t)}}}function ye(o){let r,n,e,a;return r=new S.Mesh({props:{castShadow:!0,receiveShadow:!0,$$slots:{default:[Te]},$$scope:{ctx:o}}}),e=new _e({props:{castShadow:!0,receiveShadow:!0,text:"Mundsburg",scale:.8,position:[.02,-.07,.501],color:"#000000",outlineWidth:.005}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment)},l(t){d(r.$$.fragment,t),n=M(t),d(e.$$.fragment,t)},m(t,i){v(r,t,i),b(t,n,i),v(e,t,i),a=!0},p(t,i){const f={};i&65536&&(f.$$scope={dirty:i,ctx:t}),r.$set(f)},i(t){a||($(r.$$.fragment,t),$(e.$$.fragment,t),a=!0)},o(t){p(r.$$.fragment,t),p(e.$$.fragment,t),a=!1},d(t){t&&k(n),w(r,t),w(e,t)}}}function Fe(o){let r,n,e,a;return r=new S.BoxGeometry({props:{args:[1,.025,1]}}),e=new S.MeshStandardMaterial({props:{color:"#ffffff",roughness:.2,side:F}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment)},l(t){d(r.$$.fragment,t),n=M(t),d(e.$$.fragment,t)},m(t,i){v(r,t,i),b(t,n,i),v(e,t,i),a=!0},p:N,i(t){a||($(r.$$.fragment,t),$(e.$$.fragment,t),a=!0)},o(t){p(r.$$.fragment,t),p(e.$$.fragment,t),a=!1},d(t){t&&k(n),w(r,t),w(e,t)}}}function Q(o){let r,n;return r=new S.Mesh({props:{castShadow:!0,receiveShadow:!0,"position.y":o[14]*.175+.0125,"position.z":o[9].x*.25,"position.x":o[9].y*.25,$$slots:{default:[Fe]},$$scope:{ctx:o}}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&65536&&(t.$$scope={dirty:a,ctx:e}),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function V(o){let r,n,e,a,t,i;r=new S.Mesh({props:{castShadow:!0,receiveShadow:!0,"position.y":o[9].z*.175/2+.0125,"position.z":o[9].x*.25,"position.x":o[9].y*.25,$$slots:{default:[Ae]},$$scope:{ctx:o}}}),e=new S.Group({props:{"position.x":o[9].y*.25,"position.y":o[9].z*.175+.1875,"position.z":o[9].x*.25,"rotation.y":j(G(0,3)*90),$$slots:{default:[ye]},$$scope:{ctx:o}}});let f=A(Array(o[9].z)),u=[];for(let l=0;l<f.length;l+=1)u[l]=Q(J(o,f,l));const g=l=>p(u[l],1,1,()=>{u[l]=null});return{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment),a=R();for(let l=0;l<u.length;l+=1)u[l].c();t=P()},l(l){d(r.$$.fragment,l),n=M(l),d(e.$$.fragment,l),a=M(l);for(let c=0;c<u.length;c+=1)u[c].l(l);t=P()},m(l,c){v(r,l,c),b(l,n,c),v(e,l,c),b(l,a,c);for(let _=0;_<u.length;_+=1)u[_]&&u[_].m(l,c);b(l,t,c),i=!0},p(l,c){const _={};c&65536&&(_.$$scope={dirty:c,ctx:l}),r.$set(_);const s={};if(c&65536&&(s.$$scope={dirty:c,ctx:l}),e.$set(s),c&16){f=A(Array(l[9].z));let m;for(m=0;m<f.length;m+=1){const z=J(l,f,m);u[m]?(u[m].p(z,c),$(u[m],1)):(u[m]=Q(z),u[m].c(),$(u[m],1),u[m].m(t.parentNode,t))}for(I(),m=f.length;m<u.length;m+=1)g(m);O()}},i(l){if(!i){$(r.$$.fragment,l),$(e.$$.fragment,l);for(let c=0;c<f.length;c+=1)$(u[c]);i=!0}},o(l){p(r.$$.fragment,l),p(e.$$.fragment,l),u=u.filter(Boolean);for(let c=0;c<u.length;c+=1)p(u[c]);i=!1},d(l){l&&(k(n),k(a),k(t)),w(r,l),w(e,l),ee(u,l)}}}function Ee(o){let r,n,e,a;return r=new S.BoxGeometry({props:{args:[6,1,6]}}),e=new S.MeshStandardMaterial({props:{color:"#333333",roughness:.2,side:F}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment)},l(t){d(r.$$.fragment,t),n=M(t),d(e.$$.fragment,t)},m(t,i){v(r,t,i),b(t,n,i),v(e,t,i),a=!0},p:N,i(t){a||($(r.$$.fragment,t),$(e.$$.fragment,t),a=!0)},o(t){p(r.$$.fragment,t),p(e.$$.fragment,t),a=!1},d(t){t&&k(n),w(r,t),w(e,t)}}}function Ue(o){let r,n,e,a=A(o[4]),t=[];for(let f=0;f<a.length;f+=1)t[f]=V(Y(o,a,f));const i=f=>p(t[f],1,1,()=>{t[f]=null});return n=new S.Mesh({props:{castShadow:!0,receiveShadow:!0,"position.y":-.5,$$slots:{default:[Ee]},$$scope:{ctx:o}}}),{c(){for(let f=0;f<t.length;f+=1)t[f].c();r=R(),h(n.$$.fragment)},l(f){for(let u=0;u<t.length;u+=1)t[u].l(f);r=M(f),d(n.$$.fragment,f)},m(f,u){for(let g=0;g<t.length;g+=1)t[g]&&t[g].m(f,u);b(f,r,u),v(n,f,u),e=!0},p(f,u){if(u&16){a=A(f[4]);let l;for(l=0;l<a.length;l+=1){const c=Y(f,a,l);t[l]?(t[l].p(c,u),$(t[l],1)):(t[l]=V(c),t[l].c(),$(t[l],1),t[l].m(r.parentNode,r))}for(I(),l=a.length;l<t.length;l+=1)i(l);O()}const g={};u&65536&&(g.$$scope={dirty:u,ctx:f}),n.$set(g)},i(f){if(!e){for(let u=0;u<a.length;u+=1)$(t[u]);$(n.$$.fragment,f),e=!0}},o(f){t=t.filter(Boolean);for(let u=0;u<t.length;u+=1)p(t[u]);p(n.$$.fragment,f),e=!1},d(f){f&&k(r),ee(t,f),w(n,f)}}}function je(o){let r,n,e,a;return r=new S.CircleGeometry({props:{args:[100,100]}}),e=new S.MeshStandardMaterial({props:{color:"#ffffff"}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment)},l(t){d(r.$$.fragment,t),n=M(t),d(e.$$.fragment,t)},m(t,i){v(r,t,i),b(t,n,i),v(e,t,i),a=!0},p:N,i(t){a||($(r.$$.fragment,t),$(e.$$.fragment,t),a=!0)},o(t){p(r.$$.fragment,t),p(e.$$.fragment,t),a=!1},d(t){t&&k(n),w(r,t),w(e,t)}}}function He(o){let r,n,e,a,t,i,f,u,g,l,c,_;return r=new S.PerspectiveCamera({props:{makeDefault:!0,position:[15,3,25],fov:15,$$slots:{default:[Ie]},$$scope:{ctx:o}}}),e=new Re({}),t=new S.AmbientLight({props:{color:o[0].lightColor.value,intensity:.2}}),f=new S.DirectionalLight({props:{position:[8,8,0],castShadow:!0,"shadow.mapSize.width":1024,"shadow.mapSize.height":1024,"shadow.camera.left":-10,"shadow.camera.right":10,"shadow.camera.top":-10,"shadow.camera.bottom":10,intensity:8,$$slots:{default:[Ge,({ref:s})=>({15:s}),({ref:s})=>s?32768:0]},$$scope:{ctx:o}}}),g=new S.Group({props:{"rotation.y":j(o[1]*360),$$slots:{default:[Ue]},$$scope:{ctx:o}}}),c=new S.Mesh({props:{"position.y":-1,"rotation.x":-Math.PI/2,receiveShadow:!0,$$slots:{default:[je]},$$scope:{ctx:o}}}),{c(){h(r.$$.fragment),n=R(),h(e.$$.fragment),a=R(),h(t.$$.fragment),i=R(),h(f.$$.fragment),u=R(),h(g.$$.fragment),l=R(),h(c.$$.fragment)},l(s){d(r.$$.fragment,s),n=M(s),d(e.$$.fragment,s),a=M(s),d(t.$$.fragment,s),i=M(s),d(f.$$.fragment,s),u=M(s),d(g.$$.fragment,s),l=M(s),d(c.$$.fragment,s)},m(s,m){v(r,s,m),b(s,n,m),v(e,s,m),b(s,a,m),v(t,s,m),b(s,i,m),v(f,s,m),b(s,u,m),v(g,s,m),b(s,l,m),v(c,s,m),_=!0},p(s,[m]){const z={};m&65540&&(z.$$scope={dirty:m,ctx:s}),r.$set(z);const H={};m&1&&(H.color=s[0].lightColor.value),t.$set(H);const q={};m&98308&&(q.$$scope={dirty:m,ctx:s}),f.$set(q);const E={};m&2&&(E["rotation.y"]=j(s[1]*360)),m&65536&&(E.$$scope={dirty:m,ctx:s}),g.$set(E);const W={};m&65536&&(W.$$scope={dirty:m,ctx:s}),c.$set(W)},i(s){_||($(r.$$.fragment,s),$(e.$$.fragment,s),$(t.$$.fragment,s),$(f.$$.fragment,s),$(g.$$.fragment,s),$(c.$$.fragment,s),_=!0)},o(s){p(r.$$.fragment,s),p(e.$$.fragment,s),p(t.$$.fragment,s),p(f.$$.fragment,s),p(g.$$.fragment,s),p(c.$$.fragment,s),_=!1},d(s){s&&(k(n),k(a),k(i),k(u),k(l)),w(r,s),w(e,s),w(t,s),w(f,s),w(g,s),w(c,s)}}}function qe(o,r,n){let e;B(o,ge,_=>n(2,e=_));let{params:a}=r;const{scene:t}=te(),i=a.count.value,u=(_=>{const s=[];for(let m=0;m<_;m++)s.push({x:G(-10,10),y:G(-10,10),z:G(a.minHeight.value,a.maxHeight.value)});return s})(i);let g=0,l;const c=()=>{n(1,g=Math.sin(Date.now()/2e4)),l=window.requestAnimationFrame(c)};return c(),x(()=>{l&&cancelAnimationFrame(l)}),o.$$set=_=>{"params"in _&&n(0,a=_.params)},[a,g,e,t,u]}class We extends T{constructor(r){super(),y(this,r,qe,He,D,{params:0})}}function X(o){let r,n;return r=new We({props:{params:o[1]}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&2&&(t.params=e[1]),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function Le(o){let r=o[0],n,e,a=X(o);return{c(){a.c(),n=P()},l(t){a.l(t),n=P()},m(t,i){a.m(t,i),b(t,n,i),e=!0},p(t,i){i&1&&D(r,r=t[0])?(I(),p(a,1,1,N),O(),a=X(t),a.c(),$(a,1),a.m(n.parentNode,n)):a.p(t,i)},i(t){e||($(a),e=!0)},o(t){p(a),e=!1},d(t){t&&k(n),a.d(t)}}}function Ze(o){let r,n;return r=new $e({props:{renderMode:"always",size:{width:o[2]?o[3][0]:o[4][0],height:o[2]?o[3][1]:o[4][1]},$$slots:{default:[Le]},$$scope:{ctx:o}}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,a){const t={};a&12&&(t.size={width:e[2]?e[3][0]:e[4][0],height:e[2]?e[3][1]:e[4][1]}),a&515&&(t.$$scope={dirty:a,ctx:e}),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function Ye(o){let r,n,e;function a(i){o[7](i)}let t={midiMapping:o[5],$$slots:{default:[Ze]},$$scope:{ctx:o}};return o[1]!==void 0&&(t.params=o[1]),r=new we({props:t}),se.push(()=>fe(r,"params",a)),{c(){h(r.$$.fragment)},l(i){d(r.$$.fragment,i)},m(i,f){v(r,i,f),e=!0},p(i,f){const u={};f&527&&(u.$$scope={dirty:f,ctx:i}),!n&&f&2&&(n=!0,u.params=i[1],le(()=>n=!1)),r.$set(u)},i(i){e||($(r.$$.fragment,i),e=!0)},o(i){p(r.$$.fragment,i),e=!1},d(i){w(r,i)}}}function Je(o){let r,n;return r=new be({props:{handleChange:o[8],$$slots:{default:[Ye]},$$scope:{ctx:o}}}),{c(){h(r.$$.fragment)},l(e){d(r.$$.fragment,e)},m(e,a){v(r,e,a),n=!0},p(e,[a]){const t={};a&527&&(t.$$scope={dirty:a,ctx:e}),r.$set(t)},i(e){n||($(r.$$.fragment,e),n=!0)},o(e){p(r.$$.fragment,e),n=!1},d(e){w(r,e)}}}function Ke(o,r,n){let e,a,t;B(o,C,_=>n(1,e=_)),B(o,he,_=>n(2,a=_)),B(o,de,_=>n(3,t=_));let i=Se,f="";ve.subscribe(async _=>{n(0,f=await _)});const u={0:(_,s)=>L(C,e.diameter.value=s,e),1:(_,s)=>L(C,e.sineFrequency.value=Math.max(e.sineFrequency.options?.max??10,Math.floor(s*100)),e)},g=_=>{C.set(_)};function l(_){e=_,C.set(e)}return[f,e,a,t,i,u,g,l,_=>g(_)]}class lt extends T{constructor(r){super(),y(this,r,Ke,Je,D,{})}}export{lt as component};
