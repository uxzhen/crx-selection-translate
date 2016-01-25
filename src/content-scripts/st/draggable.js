/**
 * 让翻译窗口可拖动
 * @param st
 */
import interact from 'interact.js';
import restrictBox from './restrict';

export default function ( st ) {

  function restrict() {
    restrictBox( st );
  }

  function onMove( event ) {
    const {boxPos} = st;
    boxPos.translateX += event.dx;
    boxPos.translateY += event.dy;
  }

  /* istanbul ignore next */
  if ( process.env.NODE_ENV === 'testing' ) {
    st.__restrict = restrict;
    st.__onMove = onMove;
  } else {
    st.$on( 'after translate' , restrict );
    interact( st.$els.stDrag )
      .draggable( {
        onmove : onMove ,
        onend : restrict
      } );
  }
}