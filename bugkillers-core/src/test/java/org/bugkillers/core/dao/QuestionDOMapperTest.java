package org.bugkillers.core.dao;

import org.bugkillers.core.domain.QuestionDO;
import org.bugkillers.core.enums.DataValidEnum;
import org.bugkillers.core.util.AbstractJunitTest;
import org.junit.Assert;
import org.junit.Test;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Date;

/**
 * Created by liuxinyu on 15/6/21.
 */
public class QuestionDOMapperTest extends AbstractJunitTest {

    @Autowired
    private QuestionDOMapper questionDOMapper;

    @Test
    public void insertTest(){
        QuestionDO questionDO = new QuestionDO();
        questionDO.setDr(1);
        questionDO.setUserId(1);
        questionDO.setQuestionTitle("Java 虚拟机");
        questionDO.setQuestionSummary("Java虚拟机参数配置。");
        questionDO.setQuestionText("Java按时发生的大放送爱疯");
        questionDO.setBkCreate(new Date());
        questionDO.setBkModified(new Date());
        questionDO.setCreateTime(new Date());
        questionDO.setUpdateTime(new Date());
        questionDO.setDr(DataValidEnum.VALID.getIndex());
        questionDOMapper.insert(questionDO);
//        questionDOMapper.insertSelective(questionDO);
    }

    @Test
    public void selectTest(){
        
        QuestionDO questionDO = questionDOMapper.selectByPrimaryKey(1);
        Assert.assertNotNull(questionDO);
    }
}
