<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:template match="/root" name="oxmjs-flip">
    <!-- className 'J_OXMod' required  -->
    <div class="J_OXMod oxmod-oxmjs-flip" ox-mod="oxmjs-flip">
        <!--
        <div style="width:100%;height:100px;border:solid 1px red;white-space:nowrap;overflow:auto;">
            <span style="display:inline-block;height:100px;width:100%;">1</span>
            <span style="display:inline-block;height:100px;width:100%;">2</span>
            <span style="display:inline-block;height:100px;width:100%;">3</span>
            <span style="display:inline-block;height:100px;width:100%;">4</span>
        </div>
        -->
        <div data-on="1">
            <div class="flip-window">
                <div class="flip-pages" style="width:{count(data/icon-menu/i)}00%;">
                    <xsl:for-each select="data/icon-menu/i">
                        <div class="flip-page">
                            <xsl:for-each select="i">
                                <a class="icon" target="_blank" href="{href}" >

                                    <img style="background-image:url({icon});"
                                         src="//momofox.com/uploads/img/a8876120-17db-11e6-b734-95ffd38867b8.png" />
                                    <br/>
                                    <xsl:value-of select="title"/>
                                </a>
                            </xsl:for-each>
                        </div>
                    </xsl:for-each>
                </div>

            </div>

            <div class="index-dots">
                <xsl:for-each select="data/icon-menu/i">
                    <i class="dot"></i>
                </xsl:for-each>
            </div>
        </div>

      </div>
    </xsl:template>

</xsl:stylesheet>
